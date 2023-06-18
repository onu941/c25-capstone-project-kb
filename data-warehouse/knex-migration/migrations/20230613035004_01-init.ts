import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("dim_date"))) {
    await knex.schema.createTable("dim_date", (table) => {
      table.increments("id");
      table.integer("year");
      table.integer("month");
      table.integer("day_of_month");
      table.integer("day_of_year");
      table.string("date", 255);
      table.integer("quarter");
      table.boolean("is_hidden");
      table.integer("day_of_week");
      table.unique(["year","month","day_of_month","day_of_year","date","quarter","is_hidden","day_of_week"], {indexName: "date_unique_idx"});
    });
  }
  
  if (!(await knex.schema.hasTable("dim_time"))) {
    await knex.schema.createTable("dim_time", (table) => {
      table.increments("id");
      table.time("time");
      table.integer("hour");
      table.integer("minute");
      table.string("AMPM");
      table.unique(["time","hour","minute","AMPM"], {indexName: "time_unique_idx"});
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
      table.string("source", 255).unique();
      table.string("district", 255);
      table.integer("capacity");
    });
  }
  
  if (!(await knex.schema.hasTable("dim_equipment_list"))) {
    await knex.schema.createTable("dim_equipment_list", (table) => {
      table.increments("id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.integer("equipment_id").unsigned().references("dim_equipment.id");
      table.string("start_date", 255);
      table.string("end_date", 255);
      table.unique(["partyroom_id","equipment_id"], {indexName: "equipment_list_unique_idx"});
    });
  }

  if (!(await knex.schema.hasTable("dim_category_list"))) {
    await knex.schema.createTable("dim_category_list", (table) => {
      table.increments("id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.integer("category_id").unsigned().references("dim_category.id");
      table.string("start_date", 255);
      table.string("end_date", 255);
      table.unique(["partyroom_id","category_id"], {indexName: "category_list_unique_idx"});
    });
  }

  if (!(await knex.schema.hasTable("dim_users"))) {
    await knex.schema.createTable("dim_users", (table) => {
      table.increments("id");
      table.string("promotion");
      table.string("source", 255).unique();
    });
  }

  if (!(await knex.schema.hasTable("fact_registered_partyroom"))) {
    await knex.schema.createTable("fact_registered_partyroom", (table) => {
      table.increments("id");
      table.decimal("avg_rating", 3, 1)
      table.string("source", 255).unique().unsigned().references("dim_partyroom.source");
      table.string("start_date", 255);
      table.string("end_date", 255);
      table.timestamps(false, true);
    });
  }
  
  if (!(await knex.schema.hasTable("fact_registered_users"))) {
    await knex.schema.createTable("fact_registered_users", (table) => {
      table.increments("id");
      table.string("source", 255).unique().unsigned().references("dim_users.source");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("fact_booking"))) {
    await knex.schema.createTable("fact_booking", (table) => {
      table.increments("id");
      table.integer("start_date_id").unique().unsigned().references("dim_date.id");
      table.integer("start_time_id").unique().unsigned().references("dim_time.id");
      table.integer("users_id").unique().unsigned().references("dim_users.id");
      table.integer("partyroom_id").unique().unsigned().references("dim_partyroom.id");
      table.string("source", 255).unique().unique();
      table.decimal("total_hour", 4, 2);
      table.integer("headcount");
      table.decimal("booking_fee", 7, 2);
      table.integer("rating")
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
      table.integer("quarter");
      table.boolean("is_holiday");
      table.integer("day_of_week");
      table.time("time");
      table.integer("hour");
      table.integer("minute");
      table.string("AMPM", 255);
      table.string("booking_users_promotion", 255);
      table.string("booking_users_source", 255);
      table.integer("host_users_id");
      table.string("partyroom_source", 255);
      table.string("partyroom_district", 255);
      table.integer("partyroom_capacity");
      table.decimal("total_hour", 4, 1);
      table.integer("headcount");
      table.decimal("booking_fee", 7, 2);
      table.integer("booking_review_rating");
      table.timestamps(false, true);    
    });
  }

  if (!(await knex.schema.hasTable("staging_registered_partyroom"))) {
    await knex.schema.createTable("staging_registered_partyroom", (table) => {
      table.increments("id");
      table.decimal("avg_rating", 3 ,1);
      table.integer("host_users_id");
      table.string("partyroom_source", 255);
      table.string("district", 255);
      table.integer("capacity");
      table.string("partyroom_start_date", 255);
      table.string("partyroom_end_date", 255);
      table.string("category_name", 255);
      table.string("category_start_date", 255);
      table.string("category_end_date", 255);
      table.string("equipment_name", 255);
      table.string("equipment_start_date", 255);
      table.string("equipment_end_date", 255);
      table.timestamps(false, true);    
    });
  }

  if (!(await knex.schema.hasTable("staging_registered_users"))) {
    await knex.schema.createTable("staging_registered_users", (table) => {
      table.increments("id");
      table.string("users_source", 255);
      table.string("users_promotion", 255);
      table.timestamps(false, true);    
    });
  }

  // staging_registered_users
  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_users_register() RETURNS trigger AS $$
    DECLARE
        temp_source varchar(255);
    BEGIN
        INSERT INTO dim_users (promotion, source) VALUES 
            (NEW.users_promotion, NEW.users_source) 
            RETURNING source into temp_source;

        INSERT INTO fact_registered_users (source) VALUES
            (temp_source)
            ON CONFLICT DO NOTHING;

        return NEW;
    END
    $$ LANGUAGE plpgsql;
  `)

  await knex.raw(`
    CREATE TRIGGER registered_users_trigger AFTER INSERT ON staging_registered_users
    FOR EACH ROW EXECUTE PROCEDURE insert_users_register();
  `)

  // staging_registered_partyroom

  await knex.raw(`
    CREATE OR REPLACE FUNCTION insert_partyroom_register() RETURNS trigger AS $$
    DECLARE
        temp_source varchar(255);
        partyroom_id integer;
        equipment_id integer;
        category_id integer;
    BEGIN
        INSERT INTO dim_partyroom (host_users_id, source, district, capacity) VALUES 
            (NEW.host_users_id, NEW.partyroom_source, NEW.district, NEW.capacity) 
            ON CONFLICT DO NOTHING
            RETURNING source, id into temp_source, partyroom_id;
        
        IF NOT FOUND THEN
                SELECT id INTO partyroom_id FROM dim_partyroom WHERE source = NEW.partyroom_source;
                temp_source := NEW.partyroom_source;
        END IF;

        INSERT INTO dim_equipment (name) VALUES 
            (NEW.equipment_name)
            ON CONFLICT DO NOTHING
            RETURNING id into equipment_id;

        IF NOT FOUND THEN
            SELECT id INTO equipment_id FROM dim_equipment WHERE name = NEW.equipment_name;
        END IF;

        INSERT INTO dim_category (name) VALUES 
            (NEW.category_name)
            ON CONFLICT DO NOTHING
            RETURNING id into category_id;
        
        IF NOT FOUND THEN
            SELECT id INTO category_id FROM dim_category WHERE name = NEW.category_name;
        END IF;

        INSERT INTO dim_equipment_list (partyroom_id, equipment_id, start_date, end_date) VALUES 
            (partyroom_id, equipment_id, NEW.equipment_start_date, NEW.equipment_end_date)
            ON CONFLICT DO NOTHING;

        INSERT INTO dim_category_list (partyroom_id, category_id, start_date, end_date) VALUES 
            (partyroom_id, category_id, NEW.category_start_date, NEW.category_end_date)
            ON CONFLICT DO NOTHING;
               
        INSERT INTO fact_registered_partyroom (avg_rating, source, start_date, end_date) VALUES
            (NEW.avg_rating, temp_source, NEW.partyroom_start_date, NEW.partyroom_end_date)
            ON CONFLICT DO NOTHING;
    
        return NEW;
    END
    $$ LANGUAGE plpgsql;
  `)

  await knex.raw(`
    CREATE TRIGGER registered_partyroom_trigger AFTER INSERT ON staging_registered_partyroom
    FOR EACH ROW EXECUTE PROCEDURE insert_partyroom_register();
  `)

  // // staging booking
  // await knex.raw(`
  //   CREATE OR REPLACE FUNCTION insert_booking() RETURNS trigger AS $$
  //   DECLARE
  //       start_date_id integer;
  //       start_time_id integer;
  //       users_id integer;
  //       partyroom_id integer;

  //   BEGIN
  //       INSERT INTO dim_date (year, month, day_of_month, day_of_year, date, quarter, is_holiday, day_of_week) VALUES
  //           (NEW.year, NEW.month, NEW.day_of_month, NEW.day_of_year, NEW.date, NEW.quarter, NEW.is_holiday, NEW.day_of_week)
  //           RETURNING id into start_date_id;

  //       INSERT INTO dim_time (time, hour, minute, AMPM) VALUES 
  //           (NEW.time, NEW.hour, NEW.minute, NEW.AMPM) 
  //           RETURNING id into start_time_id;
        
  //       INSERT INTO dim_users (promotion, users_register_id) VALUES 
  //           (NEW.promotion, NEW.users_register_id) 
  //           RETURNING id into users_id;
        
  //       INSERT INTO dim_partyroom (host_users_id, partyroom_register_id, district, capacity) VALUES 
  //           (NEW.host_users_id, NEW.partyroom_application_db_id, NEW.district, NEW.capacity) 
  //           RETURNING partyroom_register_id into partyroom_id;

  //       INSERT INTO fact_booking (start_date_id,start_time_id,users_id,partyroom_id,application_db_id,total_hour,headcount,booking_fee,rating) VALUES
  //           (start_date_id,start_time_id,users_id,partyroom_id,NEW.application_db_id,NEW.total_hour,NEW.headcount,NEW.booking_fee,NEW.rating);

  //       return NEW;
  //   END
  //   $$ LANGUAGE plpgsql;
  // `)

  // await knex.raw(
  //   `CREATE TRIGGER booking_trigger AFTER INSERT ON staging_booking
  //   FOR EACH ROW EXECUTE PROCEDURE insert_booking();`)
  
  // // update equipment
  // await knex.raw(`
  //   CREATE OR REPLACE FUNCTION update_dim_equipment_list_end_date() RETURNS TRIGGER AS $$
  //       BEGIN
  //           UPDATE dim_equipment_list
  //           SET end_date = NEW.start_date
  //           WHERE end_date IS NULL
  //             AND start_date <= NEW.start_date
  //             AND partyroom_id = NEW.partyroom_id;
  //             return NEW;
  //       END
  //   $$ LANGUAGE plpgsql;
  // `)

  // await knex.raw(`
  //     CREATE TRIGGER update_dim_equipment_list_end_date_trigger
  //     AFTER INSERT ON dim_equipment_list
  //     FOR EACH ROW
  //     EXECUTE FUNCTION update_dim_equipment_list_end_date();
  // `)

  // // update category
  // await knex.raw(`
  //   CREATE OR REPLACE FUNCTION update_dim_category_list_end_date() RETURNS TRIGGER AS $$
  //     BEGIN
  //       UPDATE dim_category_list
  //       SET end_date = NEW.start_date
  //       WHERE end_date IS NULL
  //         AND start_date <= NEW.start_date
  //         AND partyroom_id = NEW.partyroom_id;

  //         return NEW;
  //     END
  //   $$ LANGUAGE plpgsql;
  // `)

  // await knex.raw(`
  //     CREATE TRIGGER update_dim_category_list_end_date_trigger
  //     AFTER INSERT ON dim_category_list
  //     FOR EACH ROW
  //     EXECUTE FUNCTION update_dim_category_list_end_date();
  // `)

  // // update review
  // await knex.raw(`
  //   CREATE OR REPLACE FUNCTION update_partyroom_avg_rating() RETURNS TRIGGER AS $$
  //     BEGIN
  //       UPDATE fact_registered_partyroom
  //       SET avg_rating = (
  //         SELECT AVG(rating) 
  //         FROM dim_review 
  //         INNER JOIN fact_booking ON fact_booking.review_rating = dim_review.id
  //         INNER JOIN dim_partyroom ON fact_booking.partyroom_id = dim_partyroom.id
  //         WHERE dim_partyroom.partyroom_register_id = NEW.partyroom_register_id
  //       )
  //       WHERE id = (
  //         SELECT id 
  //         FROM fact_registered_partyroom
  //         WHERE partyroom_register_id = NEW.partyroom_register_id
  //       );
      
  //       return NEW;
  //     END
  //   $$ LANGUAGE plpgsql;
  // `)

  // await knex.raw(`
  //     CREATE TRIGGER update_partyroom_avg_rating_trigger
  //     AFTER UPDATE ON dim_review
  //     FOR EACH ROW
  //     EXECUTE FUNCTION update_partyroom_avg_rating();
  // `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('staging_registered_users');
  await knex.schema.dropTable('staging_registered_partyroom');
  await knex.schema.dropTable('staging_booking');
  await knex.schema.dropTable('fact_booking');
  await knex.schema.dropTable('fact_registered_users');
  await knex.schema.dropTable('fact_registered_partyroom');
  await knex.schema.dropTable('dim_users');
  await knex.schema.dropTable('dim_category_list');
  await knex.schema.dropTable('dim_equipment_list');
  await knex.schema.dropTable('dim_partyroom');
  await knex.schema.dropTable('dim_category');
  await knex.schema.dropTable('dim_equipment');
  await knex.schema.dropTable('dim_time');
  await knex.schema.dropTable('dim_date');
  await knex.raw('DROP TRIGGER booking_users_register_trigger ON staging_registered_users')
  await knex.raw('DROP FUNCTION insert_users_register')
  // await knex.raw('DROP TRIGGER booking_partyroom_register_trigger ON staging_registered_partyroom')
  // await knex.raw('DROP FUNCTION insert_partyroom_register')
  // await knex.raw('DROP TRIGGER booking_trigger ON staging_booking')
  // await knex.raw('DROP FUNCTION insert_booking')
  // await knex.raw('DROP TRIGGER review_trigger ON staging_registered_partyroom')
  // await knex.raw('DROP FUNCTION insert_review')
  // await knex.raw('DROP TRIGGER update_partyroom_avg_rating_trigger ON dim_review')
  // await knex.raw('DROP FUNCTION update_partyroom_avg_rating')
  // await knex.raw('DROP TRIGGER update_dim_category_list_end_date_trigger ON dim_category_list')
  // await knex.raw('DROP FUNCTION update_dim_category_list_end_date')
  // await knex.raw('DROP TRIGGER update_dim_equipment_list_end_date_trigger ON dim_equipment_list')
  // await knex.raw('DROP FUNCTION update_dim_equipment_list_end_date')
}


     