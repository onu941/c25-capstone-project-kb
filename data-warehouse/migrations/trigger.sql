CREATE UNIQUE INDEX idx_unique_date ON dim_date (year, month, day_of_month, day_of_year, date, quarter, is_holiday, day_of_week);

CREATE OR REPLACE FUNCTION insert_dim_date()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        date_id INT := 0;
    BEGIN
        INSERT INTO dim_date
        (year, month, day, hour)
        VALUES
        (NEW.year, NEW.month, NEW.day, NEW.hour)
        ON CONFLICT(year, month, day, hour)
        DO UPDATE SET
            year=NEW.year
        RETURNING id INTO date_id;
        RAISE NOTICE 'duplicated date_id: %', date_id;
        RETURN NEW;
    END;
$$;

CREATE TRIGGER trigger_insert_dim_date
BEFORE INSERT ON dim_date
FOR EACH ROW
EXECUTE PROCEDURE insert_dim_date();