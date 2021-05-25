CREATE OR REPLACE FUNCTION todo_api.delete_task(api_parameters JSON) RETURNS JSON AS
$$
BEGIN
    SET SEARCH_PATH = 'todo_api', 'public';

    DELETE FROM tasks WHERE task_id = (api_parameters->>'task_id')::BIGINT AND member_id = (api_parameters->>'member_id');

    RETURN json_build_object('task_id', (api_parameters->>'task_id')::BIGINT);

END;
$$ LANGUAGE PLPGSQL;
