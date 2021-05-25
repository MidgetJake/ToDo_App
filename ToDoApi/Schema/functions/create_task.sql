CREATE OR REPLACE FUNCTION todo_api.create_task(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    task_id_var BIGINT;
BEGIN
    SET SEARCH_PATH = 'todo_api', 'public';

    IF (api_parameters->>'member_id') IS NULL THEN
        RETURN json_build_object('error', 'missing member_id');
    END IF;

    INSERT INTO tasks(member_id, task_name)
    SELECT api_parameters->>'member_id',
        api_parameters->>'task_name'
    RETURNING task_id INTO task_id_var;


     RETURN json_build_object('task_id', task_id_var);
END;
$$ LANGUAGE PLPGSQL;
