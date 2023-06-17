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
      table.string("date", 255);
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
      table.string("name").unique();
    });
  }

  if (!(await knex.schema.hasTable("dim_category"))) {
    await knex.schema.createTable("dim_category", (table) => {
      table.increments("id");
      table.string("name").unique();
    });
  }

  

  if (!(await knex.schema.hasTable("dim_partyroom"))) {
    await knex.schema.createTable("dim_partyroom", (table) => {
      table.increments("id");
      table.integer("host_users_id");
      table.integer("partyroom_register_id").unique();
      table.string("district", 32);
      table.integer("capacity");
    });
  }
  
  if (!(await knex.schema.hasTable("dim_partyroom_equipment"))) {
    await knex.schema.createTable("dim_partyroom_equipment", (table) => {
      table.increments("id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.integer("equipment_id").unsigned().references("dim_equipment.id");
      table.string("start_date", 255);
      table.string("end_date", 255);
      table.unique(["partyroom_id","equipment_id"], "equipment_list_unique_idx");
    });
  }

  if (!(await knex.schema.hasTable("dim_partyroom_category"))) {
    await knex.schema.createTable("dim_partyroom_category", (table) => {
      table.increments("id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.integer("category_id").unsigned().references("dim_category.id");
      table.string("start_date", 255);
      table.string("end_date", 255);
      table.unique(["partyroom_id","category_id"], "category_list_unique_idx");
    });
  }

  if (!(await knex.schema.hasTable("dim_users"))) {
    await knex.schema.createTable("dim_users", (table) => {
      table.increments("id");
      table.string("promotion");
      table.integer("users_register_id").unique();
    });
  }

  if (!(await knex.schema.hasTable("dim_review"))) {
  await knex.schema.createTable("dim_review", (table) => {
    table.increments("id");
    table.integer("review_id").unique();
    table.decimal("rating",3,1);
    });
  }

  if (!(await knex.schema.hasTable("fact_partyroom_register"))) {
    await knex.schema.createTable("fact_partyroom_register", (table) => {
      table.increments("id");
      table.decimal("avg_rating", 3, 1)
      table.integer("application_db_id").unsigned().references("dim_partyroom.partyroom_register_id");
      table.string("start_date", 255);
      table.string("end_date", 255);
    });
  }
  
  if (!(await knex.schema.hasTable("fact_users_register"))) {
    await knex.schema.createTable("fact_users_register", (table) => {
      table.increments("id");
      table.integer("application_db_id").unsigned().references("dim_users.users_register_id");
    });
  }

  if (!(await knex.schema.hasTable("fact_review"))) {
  await knex.schema.createTable("fact_review", (table) => {
    table.increments("id");
    table.integer("application_db_id").unsigned().references("dim_review.review_id");
    });
  }

  if (!(await knex.schema.hasTable("fact_booking"))) {
    await knex.schema.createTable("fact_booking", (table) => {
      table.increments("id");
      table.integer("start_date_id").unsigned().references("dim_date.id");
      table.integer("start_time_id").unsigned().references("dim_time.id");
      table.integer("users_id").unsigned().references("dim_users.id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.integer("application_db_id");
      table.decimal("total_hour", 4, 2);
      table.integer("headcount");
      table.decimal("booking_fee", 7, 2);
      table.integer("rating").unsigned().references("dim_review.id")
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
      table.string("booking_users_promotion", 255);
      table.integer("host_users_id");
      table.string("partyroom_district", 255);
      table.integer("partyroom_capacity");
      table.timestamps(false, true);    
    });
  }

  if (!(await knex.schema.hasTable("staging_partyroom_register"))) {
    await knex.schema.createTable("staging_partyroom_register", (table) => {
      table.increments("id");
      table.decimal("avg_rating", 3 ,1);
      table.integer("host_users_id");
      table.string("partyroom_district", 255);
      table.integer("partyroom_capacity");
      table.integer("partyroom_application_db_id");
      table.string("partyroom_start_date", 255);
      table.string("partyroom_end_date", 255);
      table.string("partyroom_category_name", 255);
      table.string("partyroom_category_start_date", 255);
      table.string("partyroom_category_end_date", 255);
      table.string("partyroom_equipment_name", 255);
      table.string("partyroom_equipment_start_date", 255);
      table.string("partyroom_equipment_end_date", 255);
      table.timestamps(false, true);    
    });
  }

  if (!(await knex.schema.hasTable("staging_users_register"))) {
    await knex.schema.createTable("staging_users_register", (table) => {
      table.increments("id");
      table.integer("booking_users_application_db_id");
      table.string("booking_users_promotion", 255);
      table.timestamps(false, true);    
    });
  }

  if (!(await knex.schema.hasTable("staging_review"))) {
    await knex.schema.createTable("staging_review", (table) => {
      table.increments("id");
      table.integer("booking_review_application_db_id");
      table.decimal("booking_rating", 3,1);
      table.timestamps(false, true);    
    });
  }

  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_booking() RETURNS trigger AS $$
    DECLARE
        start_date_id integer;
        start_time_id integer;
        users_id integer;
        partyroom_id integer;

    BEGIN
        INSERT INTO dim_date (year, month, day_of_month, day_of_year, date, quarter, is_holiday, day_of_week) VALUES
            (NEW.year, NEW.month, NEW.day_of_month, NEW.day_of_year, NEW.date, NEW.quarter, NEW.is_holiday, NEW.day_of_week)
            RETURNING id into start_date_id;

        INSERT INTO dim_time (time, hour, minute, AMPM) VALUES 
            (NEW.time, NEW.hour, NEW.minute, NEW.AMPM) 
            RETURNING id into start_time_id;
        
        INSERT INTO dim_users (promotion, users_register_id) VALUES 
            (NEW.promotion, NEW.users_register_id) 
            RETURNING id into users_id;
        
        INSERT INTO dim_partyroom (host_users_id, partyroom_register_id, district, capacity) VALUES 
            (NEW.host_users_id, NEW.partyroom_application_db_id, NEW.district, NEW.capacity) 
            RETURNING partyroom_register_id into partyroom_id;

        INSERT INTO fact_booking (start_date_id,start_time_id,users_id,partyroom_id,application_db_id,total_hour,headcount,booking_fee,rating) VALUES
            (start_date_id,start_time_id,users_id,partyroom_id,NEW.application_db_id,NEW.total_hour,NEW.headcount,NEW.booking_fee,NEW.rating);

        return NEW;
    END
    $$ LANGUAGE plpgsql;
  `)

  await knex.raw(
    `CREATE TRIGGER booking_trigger AFTER INSERT ON staging_booking
    FOR EACH ROW EXECUTE PROCEDURE insert_booking();`)
  
  // staging_users_register
  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_users_register() RETURNS trigger AS $$
    DECLARE
        application_db_id integer;
    BEGIN
        INSERT INTO dim_users (promotion, users_register_id) VALUES 
            (NEW.booking_users_promotion, NEW.booking_users_application_db_id) 
            RETURNING users_register_id into application_db_id;

        INSERT INTO fact_users_register (application_db_id) VALUES
            (application_db_id);

        return NEW;
    END
    $$ LANGUAGE plpgsql;
  `)

  await knex.raw(`
    CREATE TRIGGER booking_users_register_trigger AFTER INSERT ON staging_users_register
    FOR EACH ROW EXECUTE PROCEDURE insert_users_register();
  `)

  // staging_partyroom_register

  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_partyroom_register() RETURNS trigger AS $$
    DECLARE
        application_db_id integer;
        partyroom_id integer;
        equipment_id integer;
        category_id integer;
    BEGIN
        INSERT INTO dim_partyroom (host_users_id, partyroom_register_id, district, capacity) VALUES 
            (NEW.host_users_id, NEW.partyroom_application_db_id, NEW.partyroom_district, NEW.partyroom_capacity) 
            ON CONFLICT DO NOTHING
            RETURNING partyroom_register_id, id into application_db_id, partyroom_id;
        
        IF NOT FOUND THEN
                SELECT id INTO partyroom_id FROM dim_partyroom WHERE partyroom_register_id = NEW.partyroom_application_db_id;
                application_db_id := NEW.partyroom_application_db_id;
        END IF;

        INSERT INTO dim_equipment (name) VALUES 
            (NEW.partyroom_equipment_name)
            ON CONFLICT DO NOTHING
            RETURNING id into equipment_id;

        IF NOT FOUND THEN
            SELECT id INTO equipment_id FROM dim_equipment WHERE name = NEW.partyroom_equipment_name;
        END IF;

        INSERT INTO dim_category (name) VALUES 
            (NEW.partyroom_category_name)
            ON CONFLICT DO NOTHING
            RETURNING id into category_id;
        
        IF NOT FOUND THEN
            SELECT id INTO category_id FROM dim_category WHERE name = NEW.partyroom_category_name;
        END IF;

        INSERT INTO dim_partyroom_equipment (partyroom_id, equipment_id, start_date, end_date) VALUES 
            (partyroom_id, equipment_id, NEW.partyroom_equipment_start_date, NEW.partyroom_equipment_end_date)
            ON CONFLICT DO NOTHING;

        INSERT INTO dim_partyroom_category (partyroom_id, category_id, start_date, end_date) VALUES 
            (partyroom_id, category_id, NEW.partyroom_category_start_date, NEW.partyroom_category_end_date)
            ON CONFLICT DO NOTHING;
               
        INSERT INTO fact_partyroom_register (avg_rating, application_db_id, start_date, end_date) VALUES
            (NEW.avg_rating, NEW.partyroom_application_db_id, NEW.partyroom_start_date, NEW.partyroom_end_date);
    
        return NEW;
    END
    $$ LANGUAGE plpgsql;
  `)

  await knex.raw(`
    CREATE TRIGGER booking_partyroom_register_trigger AFTER INSERT ON staging_partyroom_register
    FOR EACH ROW EXECUTE PROCEDURE insert_partyroom_register();
  `)

  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_review() RETURNS trigger AS $$
    DECLARE
        application_db_id integer;
    BEGIN
        INSERT INTO dim_review (review_id, rating) VALUES 
            (NEW.review_id, NEW.rating) 
            RETURNING review_id into application_db_id;
       
        INSERT INTO fact_review (application_db_id) VALUES
            (NEW.application_db_id);
    
        return NEW;
    END
    $$ LANGUAGE plpgsql;
  `)

  await knex.raw(`
    CREATE TRIGGER review_trigger AFTER INSERT ON staging_review
    FOR EACH ROW EXECUTE PROCEDURE insert_review();
  `)

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_dim_partyroom_equipment_end_date() RETURNS TRIGGER AS $$
        BEGIN
            UPDATE dim_partyroom_equipment
            SET end_date = NEW.start_date
            WHERE end_date IS NULL
              AND start_date <= NEW.start_date
              AND partyroom_id = NEW.partyroom_id;
              return NEW;
        END
    $$ LANGUAGE plpgsql;
  `)

    await knex.raw(`
        CREATE TRIGGER update_dim_partyroom_equipment_end_date_trigger
        AFTER INSERT ON dim_partyroom_equipment
        FOR EACH ROW
        EXECUTE FUNCTION update_dim_partyroom_equipment_end_date();
    `)

    await knex.raw(`
      CREATE OR REPLACE FUNCTION update_dim_partyroom_category_end_date() RETURNS TRIGGER AS $$
        BEGIN
          UPDATE dim_partyroom_category
          SET end_date = NEW.start_date
          WHERE end_date IS NULL
            AND start_date <= NEW.start_date
            AND partyroom_id = NEW.partyroom_id;

            return NEW;
        END
      $$ LANGUAGE plpgsql;
    `)

    await knex.raw(`
        CREATE TRIGGER update_dim_partyroom_category_end_date_trigger
        AFTER INSERT ON dim_partyroom_category
        FOR EACH ROW
        EXECUTE FUNCTION update_dim_partyroom_category_end_date();
    `)

    await knex.raw(`
      CREATE OR REPLACE FUNCTION update_partyroom_avg_rating() RETURNS TRIGGER AS $$
        BEGIN
          UPDATE fact_partyroom_register
          SET avg_rating = (
            SELECT AVG(rating) 
            FROM dim_review 
            INNER JOIN fact_booking ON fact_booking.review_rating = dim_review.id
            INNER JOIN dim_partyroom ON fact_booking.partyroom_id = dim_partyroom.id
            WHERE dim_partyroom.partyroom_register_id = NEW.partyroom_register_id
          )
          WHERE id = (
            SELECT id 
            FROM fact_partyroom_register
            WHERE partyroom_register_id = NEW.partyroom_register_id
          );
        
          return NEW;
        END
      $$ LANGUAGE plpgsql;
    `)

    await knex.raw(`
        CREATE TRIGGER update_partyroom_avg_rating_trigger
        AFTER UPDATE ON dim_review
        FOR EACH ROW
        EXECUTE FUNCTION update_partyroom_avg_rating();
    `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('staging_review');
  await knex.schema.dropTable('staging_users_register');
  await knex.schema.dropTable('staging_partyroom_register');
  await knex.schema.dropTable('staging_booking');
  await knex.schema.dropTable('fact_booking');
  await knex.schema.dropTable('fact_review');
  await knex.schema.dropTable('fact_users_register');
  await knex.schema.dropTable('fact_partyroom_register');
  await knex.schema.dropTable('dim_review');
  await knex.schema.dropTable('dim_users');
  await knex.schema.dropTable('dim_partyroom_category');
  await knex.schema.dropTable('dim_partyroom_equipment');
  await knex.schema.dropTable('dim_partyroom');
  await knex.schema.dropTable('dim_category');
  await knex.schema.dropTable('dim_equipment');
  await knex.schema.dropTable('dim_time');
  await knex.schema.dropTable('dim_date');
  await knex.raw('DROP TRIGGER booking_trigger ON staging_booking')
  await knex.raw('DROP FUNCTION insert_booking')
  await knex.raw('DROP TRIGGER booking_users_register_trigger ON staging_users_register')
  await knex.raw('DROP FUNCTION insert_users_register')
  await knex.raw('DROP TRIGGER booking_partyroom_register_trigger ON staging_partyroom_register')
  await knex.raw('DROP FUNCTION insert_partyroom_register')
  await knex.raw('DROP TRIGGER review_trigger ON staging_partyroom_register')
  await knex.raw('DROP FUNCTION insert_review')
  await knex.raw('DROP TRIGGER update_partyroom_avg_rating_trigger ON dim_review')
  await knex.raw('DROP FUNCTION update_partyroom_avg_rating')
  await knex.raw('DROP TRIGGER update_dim_partyroom_category_end_date_trigger ON dim_partyroom_category')
  await knex.raw('DROP FUNCTION update_dim_partyroom_category_end_date')
  await knex.raw('DROP TRIGGER update_dim_partyroom_equipment_end_date_trigger ON dim_partyroom_equipment')
  await knex.raw('DROP FUNCTION update_dim_partyroom_equipment_end_date')
}


     