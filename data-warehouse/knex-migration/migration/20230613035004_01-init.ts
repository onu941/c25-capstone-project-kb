import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("dim_date"))) {
    await knex.schema.createTable("dim_date", (table) => {
      table.increments("id");
      table.string("name", 32);
      table.integer("year");
      table.integer("month");
      table.integer("district_id");
      table.integer("day_of_month");
      table.integer("day_of_year");
      table.string("date", 32);
      table.integer("quarter");
      table.boolean("is_hidden");
      table.integer("day_of_week");
    });
  }
  
  if (!(await knex.schema.hasTable("dim_time"))) {
    await knex.schema.createTable("dim_time", (table) => {
      table.increments("id");
      table.time("time");
      table.integer("hour");
      table.integer("minute");
      table.string("AMPM");
    });
  }
  
  if (!(await knex.schema.hasTable("dim_equipment"))) {
    await knex.schema.createTable("dim_equipment", (table) => {
      table.increments("id");
      table.string("name");
    });
  }

  if (!(await knex.schema.hasTable("dim_category"))) {
    await knex.schema.createTable("dim_category", (table) => {
      table.increments("id");
      table.string("name");
    });
  }

  if (!(await knex.schema.hasTable("fact_partyroom_register"))) {
    await knex.schema.createTable("fact_partyroom_register", (table) => {
      table.increments("id");
      table.decimal("avg_rating", 3, 1)
      table.string("source", 255);
      table.date("start_date");
      table.date("end_date");
    });
  }
  
  if (!(await knex.schema.hasTable("fact_users_register"))) {
    await knex.schema.createTable("fact_users_register", (table) => {
      table.increments("id");
      table.string("source", 255);
    });
  }

  if (!(await knex.schema.hasTable("dim_partyroom"))) {
    await knex.schema.createTable("dim_partyroom", (table) => {
      table.increments("id");
      table.integer("host_users_id");
      table.integer("partyroom_register_id").unsigned().references("fact_partyroom_register.id");
      table.string("district", 255);
      table.integer("capacity");
    });
  }
  
  if (!(await knex.schema.hasTable("dim_partyroom_equipment"))) {
    await knex.schema.createTable("dim_partyroom_equipment", (table) => {
      table.increments("id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.integer("equipment_id").unsigned().references("dim_equipment.id");
      table.date("start_date");
      table.date("end_date");
    });
  }

  if (!(await knex.schema.hasTable("dim_partyroom_category"))) {
    await knex.schema.createTable("dim_partyroom_category", (table) => {
      table.increments("id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.integer("category_id").unsigned().references("dim_category.id");
      table.date("start_date");
      table.date("end_date");
    });
  }

  if (!(await knex.schema.hasTable("dim_users"))) {
    await knex.schema.createTable("dim_users", (table) => {
      table.increments("id");
      table.string("promotion");
      table.integer("user_register_id").unsigned().references("fact_users_register.id");
    });
  }

  if (!(await knex.schema.hasTable("fact_booking"))) {
    await knex.schema.createTable("fact_booking", (table) => {
      table.increments("id");
      table.integer("start_date_id").unsigned().references("dim_date.id");
      table.integer("start_time_id").unsigned().references("dim_time.id");
      table.integer("users_id").unsigned().references("dim_users.id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.string("source", 255);
      table.decimal("total_hour", 4, 2);
      table.integer("headcount");
      table.decimal("booking_fee", 7, 2);
      table.decimal("rating", 3, 1);
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("staging_booking"))) {
    await knex.schema.createTable("staging_booking", (table) => {
      table.increments("id");
      table.integer("year");
      table.integer("month");
      table.integer("day_of_month");
      table.integer("day_of_year");
      table.string("date", 255);
      table.integer("partyroom_id");
      table.integer("quarter");
      table.boolean("is_holiday");
      table.integer("day_of_week");
      table.time("time");
      table.integer("hour");
      table.integer("minute");
      table.string("AMPM", 255);
      table.decimal("total_hour", 4, 2);
      table.integer("headcount");
      table.decimal("booking_fee", 7, 2);
      table.decimal("booking_rating",3,1);
      table.string("booking_user_promotion", 255);
      table.integer("host_users_id");
      table.string("partyroom_district", 255);
      table.integer("partyroom_capacity");
      table.timestamps(false, true);    
    });
  }

  if (!(await knex.schema.hasTable("staging_partyroom_register"))) {
    await knex.schema.createTable("staging_partyroom_register", (table) => {
      table.increments("id");
      table.decimal("avg_rating", 3 ,1)
      table.integer("host_users_id");
      table.string("partyroom_district", 255);
      table.integer("partyroom_capacity");
      table.string("partyroom_source", 255);
      table.date("partyroom_start_date");
      table.date("partyroom_end_date");
      table.string("partyroom_category_name", 255);
      table.date("partyroom_category_start_date");
      table.date("partyroom_category_end_date");
      table.string("partyroom_equipment_name", 255);
      table.date("partyroom_equipment_start_date");
      table.date("partyroom_equipment_end_date");
      table.timestamps(false, true);    
    });
  }

  if (!(await knex.schema.hasTable("staging_users_register"))) {
    await knex.schema.createTable("staging_users_register", (table) => {
      table.increments("id");
      table.string("booking_user_source", 255);
      table.string("booking_user_promotion", 255);
      table.timestamps(false, true);    
    });
  }

  knex.schema.raw(`
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
  `)

  knex.schema.raw(
    `CREATE TRIGGER booking_trigger AFTER INSERT ON staging_booking
    FOR EACH ROW EXECUTE PROCEDURE insert_booking();`)
  
  // staging_users_register
  knex.schema.raw(`
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
  `)

  knex.schema.raw(`
    CREATE TRIGGER booking_users_register AFTER INSERT ON staging_users_register
    OR EACH ROW EXECUTE PROCEDURE insert_users_register();
  `)

  // staging_partyroom_register

  knex.schema.raw(`
    CREATE OR REPLACE FUNCTION insert_partyroom_register() RETURNS trigger AS $$
    DECLARE
        users_id integer;
    BEGIN
        INSERT INTO dim_partyroom (host_users_id, partyroom_register_id, district, capacity) VALUES 
            (NEW.host_users_id, NEW.partyroom_register_id, NEW.district, NEW.capacity) 
            RETURNING id into partyroom_id;
       
        INSERT INTO fact_partyroom_register (avg_rating, source, start_date, end_date) VALUES
            (NEW.avg_rating, NEW.source, NEW.start_date, NEW.end_date);
    
        return NEW;
    END
    $$ LANGUAGE plpgsql;
  `)

  knex.schema.raw(`
    CREATE TRIGGER booking_partyroom_register AFTER INSERT ON staging_partyroom_register
    FOR EACH ROW EXECUTE PROCEDURE insert_partyroom_register();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('staging_users_register');
  await knex.schema.dropTable('staging_partyroom_register');
  await knex.schema.dropTable('staging_booking');
  await knex.schema.dropTable('fact_booking');
  await knex.schema.dropTable('dim_users');
  await knex.schema.dropTable('dim_partyroom_category');
  await knex.schema.dropTable('dim_partyroom_equipment');
  await knex.schema.dropTable('dim_partyroom');
  await knex.schema.dropTable('fact_users_register');
  await knex.schema.dropTable('fact_partyroom_register');
  await knex.schema.dropTable('dim_category');
  await knex.schema.dropTable('dim_equipment');
  await knex.schema.dropTable('dim_time');
  await knex.schema.dropTable('dim_date');
  await knex.schema.raw('DROP TRIGGER booking_trigger ON staging_booking')
  await knex.schema.raw('DROP FUNCTION insert_booking')
  await knex.schema.raw('DROP TRIGGER booking_trigger ON staging_users_register')
  await knex.schema.raw('DROP FUNCTION insert_users_register')
  await knex.schema.raw('DROP TRIGGER booking_trigger ON staging_partyroom_register')
  await knex.schema.raw('DROP FUNCTION insert_partyroom_register')
}


     