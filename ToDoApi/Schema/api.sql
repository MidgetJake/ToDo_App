CREATE OR REPLACE FUNCTION todo_api.api(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    ret_var JSON;
    f8 TEXT;
BEGIN

    SET SEARCH_PATH = 'todo_api', 'public';

    CASE WHEN api_parameters->>'method' IN ('get_tasks') THEN
            ret_var = get_tasks(api_parameters);
         WHEN api_parameters->>'method' IN ('update_task') THEN
            ret_var = update_task(api_parameters);
         WHEN api_parameters->>'method' IN ('delete_task') THEN
            ret_var = delete_task(api_parameters);
         WHEN api_parameters->>'method' IN ('create_task') THEN
            ret_var = create_task(api_parameters);
         WHEN api_parameters->>'method' IN ('register_user') THEN
            ret_var = register_user(api_parameters);
         ELSE
            RETURN json_build_object('error', 'unsupported method');
    END CASE;

    RETURN ret_var;
EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS f8 = PG_EXCEPTION_DETAIL;
    RETURN json_build_object('error', 'api error', 'log_id', todo_api.log(jsonb_build_object('error', SQLERRM ||' '||f8)));
END;
$$ LANGUAGE PLPGSQL;
