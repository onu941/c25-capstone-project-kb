-- staging_booking

CREATE OR REPLACE FUNCTION insert_booking() RETURNS trigger AS $$
    DECLARE
        date_id integer;
        time_id integer;
        users_id integer;
        partyroom_id integer;
        partyroom_equipment_id integer;
        partyroom_category_id integer;
        equipment_id integer;
        category_id integer;
    BEGIN
        INSERT INTO dim_date (year, month, day_of_month, day_of_year, date, quarter, is_holiday, day_of_week) VALUES
            (NEW.year, NEW.month, NEW.day_of_month, NEW.day_of_year, NEW.date, NEW.quarter, NEW.is_holiday, NEW.day_of_week)
            RETURNING id into date_id;

        INSERT INTO dim_time (time, hour, minute, AMPM) VALUES 
            (NEW.time, NEW.hour, NEW.minute, NEW.AMPM) 
            RETURNING id into time_id;
        
        INSERT INTO dim_users (promotion, user_register_id) VALUES 
            (NEW.promotion, NEW.user_register_id) 
            RETURNING id into users_id;
        
        INSERT INTO dim_partyroom (host_users_id, partyroom_register_id, district, capacity) VALUES 
            (NEW.host_users_id, NEW.partyroom_register_id, NEW.district, NEW.capacity) 
            RETURNING id into partyroom_id;
        
        INSERT INTO dim_partyroom_equipment (partyroom_id, equipment_id, start_date, end_date) VALUES 
            (NEW.partyroom_id, NEW.equipment_id, NEW.start_date, NEW.end_date)
            RETURNING id into partyroom_equipment_id;

        INSERT INTO dim_partyroom_category (partyroom_id, category_id, start_date, end_date) VALUES 
            (NEW.partyroom_id, NEW.category_id, NEW.start_date, NEW.end_date)
            RETURNING id into partyroom_category_id;
        
        INSERT INTO dim_equipment (name) VALUES 
            (NEW.name) 
            RETURNING id into equipment_id;

        INSERT INTO dim_category (name) VALUES 
            (NEW.name) 
            RETURNING id into category_id;

        INSERT INTO fact_booking (start_date_id,start_time_id,users_id,partyroom_id,source,total_hour,headcount,booking_fee,rating) VALUES
            (NEW.start_date_id,NEW.start_time_id,NEW.users_id,NEW.partyroom_id,NEW.source,NEW.total_hour,NEW.headcount,NEW.booking_fee,NEW.rating);

        return NEW;
    END
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_trigger AFTER INSERT ON staging_booking
FOR EACH ROW EXECUTE PROCEDURE insert_booking();


-- staging_users_register

CREATE OR REPLACE FUNCTION insert_users_register() RETURNS trigger AS $$
    DECLARE
        users_id integer;
    BEGIN
        INSERT INTO dim_users (promotion, user_register_id) VALUES 
            (NEW.promotion, NEW.user_register_id) 
            RETURNING id into users_id;
       
        INSERT INTO fact_users_register (source) VALUES
            (NEW.source);

        return NEW;
    END
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_users_register AFTER INSERT ON staging_users_register
FOR EACH ROW EXECUTE PROCEDURE insert_users_register();


-- staging_partyroom_register

CREATE OR REPLACE FUNCTION insert_partyroom_register() RETURNS trigger AS $$
    DECLARE
        users_id integer;
    BEGIN
        INSERT INTO dim_partyroom (host_users_id, partyroom_register_id, district, capacity) VALUES 
            (NEW.host_users_id, NEW.partyroom_register_id, NEW.district, NEW.capacity) 
            RETURNING id into partyroom_id;
       
        INSERT INTO fact_users_register (source, start_date, end_date) VALUES
            (NEW.source, NEW.start_date, NEW.end_date);

        return NEW;
    END
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_partyroom_register AFTER INSERT ON staging_partyroom_register
FOR EACH ROW EXECUTE PROCEDURE insert_partyroom_register();
