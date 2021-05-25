DO
$$
BEGIN
    DROP SCHEMA IF EXISTS todo_api CASCADE;
    CREATE SCHEMA IF NOT EXISTS todo_api;

    --Member Details
    CREATE TABLE IF NOT EXISTS todo_api.members(
        member_id           TEXT PRIMARY KEY NOT NULL,
        date_added          TIMESTAMP DEFAULT NOW()
    );

    --Category Details
    CREATE TABLE IF NOT EXISTS todo_api.tasks(
        task_id             BIGSERIAL PRIMARY KEY,
        task_name           TEXT,
        task_completed      BOOLEAN DEFAULT false,
        member_id           TEXT,
        date_added          TIMESTAMP DEFAULT NOW(),

        CONSTRAINT memberlist_mem_fk FOREIGN KEY(member_id)
        REFERENCES todo_api.members (member_id)
        MATCH SIMPLE ON DELETE CASCADE
    );

    --Log Messages
    CREATE TABLE IF NOT EXISTS todo_api.logs(
        log_id          BIGSERIAL PRIMARY KEY,
        log_timestamp   TIMESTAMP DEFAULT NOW(),
        log_message     JSONB
    );
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'ERROR CREATING TABLES %', SQLERRM;
END;
$$ LANGUAGE PLPGSQL;
