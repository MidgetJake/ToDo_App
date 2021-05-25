CREATE OR REPLACE FUNCTION todo_api.update_task(api_parameters JSON) RETURNS JSON AS
$$
BEGIN
    SET SEARCH_PATH = 'todo_api', 'public';

    UPDATE tasks SET
        task_completed = (api_parameters->>'completed')::BOOLEAN
    WHERE task_id = (api_parameters->>'task_id')::BIGINT AND member_id = (api_parameters->>'member_id');

    RETURN json_build_object('success', true);

END;
$$ LANGUAGE PLPGSQL;
