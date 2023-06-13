-- CREATE staging, fact and dimension table
CREATE TABLE staging_booking(
    id SERIAL PRIMARY KEY,
    year integer,
    month integer,
    day_of_month integer,
    day_of_year integer,
    date varchar(255),
    quarter integer,
    is_holiday boolean,
    day_of_week integer,
    time time,
    hour integer,
    minute integer,
    AMPM varchar(255),
    booking_user_promotion varchar(255),
    host_users_id integer,
    partyroom_district varchar(255),
    partyroom_capacity integer,
    created_at datetime
);

CREATE TABLE staging_partyroom_register(
    id SERIAL PRIMARY KEY,
    host_users_id integer,
    district varchar(255),
    capacity integer,
    partyroom_source varchar(255),
    partyroom_start_date datetime,
    partyroom_end_date datetime,
    category_name varchar(255),
    category_start_date datetime,
    category_end_date datetime,
    equipment_name varchar(255),
    equipment_start_date datetime,
    equipment_end_date datetime,
    created_at datetime,
);

CREATE TABLE staging_users_register(
    id SERIAL PRIMARY KEY,
    booking_user_source varchar(255),
    booking_user_promotion varchar(255),
    created_at datetime
);

CREATE TABLE fact_booking(
    id SERIAL PRIMARY KEY,
    start_date_id integer ,
    foreign key (start_date_id) references dim_date(id),
    start_time_id integer ,
    foreign key (start_time_id) references dim_time(id),
    users_id integer ,
    foreign key (users_id) references dim_users(id),
    partyroom_id integer ,
    foreign key (partyroom_id) references dim_partyroom(id),
    source varchar(255),
    total_hour numberic(4,2),
    headcount integer,
    booking_fee numeric(7,2),
    rating decimal
);

CREATE TABLE fact_partyroom_register(
    id SERIAL PRIMARY KEY,
    source varchar(255),
    start_date datetime,
    end_date datetime
);

CREATE TABLE fact_users_register(
    id SERIAL PRIMARY KEY,
    source varchar(255)
);

CREATE TABLE dim_date(
    id SERIAL PRIMARY KEY,
    year integer,
    month integer,
    day_of_month integer,
    day_of_year integer,
    date varcahar(255),
    quarter integer,
    is_holiday boolean,
    day_of_week integer
);

CREATE UNIQUE INDEX date_unique_idx on dim_users (year, month, day_of_month, day_of_year, date, quarter, is_holiday, day_of_week);

CREATE TABLE dim_time(
    id SERIAL PRIMARY KEY,
    time time,
    hour integer,
    minute integer,
    AMPM varchar(32)
);

CREATE UNIQUE INDEX time_unique_idx on dim_time (time, hour, minute, AMPM);


CREATE TABLE dim_users(
    id SERIAL PRIMARY KEY,
    promotion varchar(255),
    user_register_id integer ,
    foreign key (user_register_id) references fact_users_register(id)
);

CREATE UNIQUE INDEX users_unique_idx on dim_users (promotion, user_register_id);

CREATE TABLE dim_partyroom(
    id SERIAL PRIMARY KEY,
    host_users_id integer,
    partyroom_register_id integer ,
    foreign key (partyroom_register_id) references fact_partyroom_register(id),
    district varchar(255),
    capacity integer
);

CREATE UNIQUE INDEX partyroom_unique_idx on dim_partyroom (host_users_id, partyroom_register_id, district, capacity);

CREATE TABLE dim_partyroom_equipment(
    id SERIAL PRIMARY KEY,
    partyroom_id integer ,
    foreign key (partyroom_id) references dim_partyroom(id),
    equipment_id integer ,
    foreign key (equipment_id) references dim_equipment(id),
    start_date datetime,
    end_date datetime
);

CREATE UNIQUE INDEX partyroom_equipment_unique_idx on dim_partyroom_equipment (partyroom_id, equipment_id, start_date, end_date);

CREATE TABLE dim_equipment(
    id SERIAL PRIMARY KEY,
    name varchar(255)
);

CREATE UNIQUE INDEX equipment_unique_idx on dim_equipment (name);

CREATE TABLE dim_partyroom_category(
    id SERIAL PRIMARY KEY,
    partyroom_id integer ,
    foreign key (partyroom_id) references dim_partyroom(id),
    category_id integer ,
    foreign key (category_id) references dim_category(id),
    start_date datetime,
    end_date datetime
);

CREATE UNIQUE INDEX partyroom_category_unique_idx on dim_partyroom_category (partyroom_id, category_id, start_date, end_date);

CREATE TABLE dim_category(
    id SERIAL PRIMARY KEY,
    name varchar(255)
);

CREATE UNIQUE INDEX category_category_unique_idx on dim_category (name);