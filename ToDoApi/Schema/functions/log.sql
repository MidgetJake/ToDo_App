CREATE OR REPLACE FUNCTION todo_api.log(log_message JSONB) RETURNS BIGINT AS
$$
DECLARE
    log_id_var BIGINT;
BEGIN

    INSERT INTO todo_api.logs(log_message)
    SELECT log_message
    RETURNING log_id
    INTO log_id_var;

    RETURN log_id_var;
END;
$$
LANGUAGE PLPGSQL;
