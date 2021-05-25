CREATE OR REPLACE FUNCTION todo_api.get_tasks(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    ret_var JSON;
    default_limit INTEGER DEFAULT 15; -- Set a default limit of retrieved tasks to 15
    default_offset INTEGER DEFAULT 0; -- Start from the beginning by default
BEGIN
    SET SEARCH_PATH = 'todo_api', 'public';

    -- If there is a limit passed to the function then update the limit for the api call
    IF COALESCE(api_parameters->>'limit','') ~ '^[0-9]+$' THEN
        default_limit = (api_parameters->>'limit')::INTEGER;
    END IF;

    -- If there is a offset passed to the function then update the offset for the api call
    IF COALESCE(api_parameters->>'offset','') ~ '^[0-9]+$' THEN
        default_offset = (api_parameters->>'offset')::INTEGER;
    END IF;

    -- Return the tasks into an array
    SELECT json_agg(row_to_json(SUB.*))
    INTO ret_var
    FROM  (
         SELECT
                task_id as id,
                task_name as name,
                task_completed AS completed,
                date_added
         FROM tasks
         WHERE member_id = api_parameters->>'member_id'
         OFFSET default_offset
         LIMIT default_limit
    ) SUB;


    RETURN COALESCE(ret_var, '[]'::JSON);

END;
$$ LANGUAGE PLPGSQL;
