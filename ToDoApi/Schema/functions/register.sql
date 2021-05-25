CREATE OR REPLACE FUNCTION todo_api.register_user(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    member_id_var TEXT;
BEGIN
    member_id_var := api_parameters->>'member_id';

    SET SEARCH_PATH = 'todo_api', 'public';

    INSERT INTO members(member_id)
    SELECT  member_id_var
    RETURNING member_id
    INTO member_id_var;

    RETURN json_build_object('member_id', member_id_var);

END;
$$ LANGUAGE PLPGSQL;
