import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("fact_booking"))) {
    await knex.schema.createTable("fact_booking", (table) => {
      table.increments("id");
      table.integer("start_date_id").unsigned().references("dim_date.id");
      table.integer("start_time_id").unsigned().references("dim_time.id");
      table.integer("users_id").unsigned().references("dim_users.id");
      table.integer("partyroom_id").unsigned().references("dim_partyroom.id");
      table.string("source", 255);
      table.numeric("total_hour", 4, 2);
      table.integer("headcount");
      table.numeric("booking_fee", 7, 2);
      table.decimal("rating");
      table.timestamps(false, true);
    });
  }

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

  if (!(await knex.schema.hasTable("dim_users"))) {
    await knex.schema.createTable("dim_users", (table) => {
      table.increments("id");
      table.string("promotion");
      table.integer("user_register_id").unsigned().references("fact_users_register.id");
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

  if (!(await knex.schema.hasTable("dim_equipment"))) {
    await knex.schema.createTable("dim_equipment", (table) => {
      table.increments("id");
      table.string("name");
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

  if (!(await knex.schema.hasTable("dim_category"))) {
    await knex.schema.createTable("dim_category", (table) => {
      table.increments("id");
      table.string("name");
    });
  }

  if (!(await knex.schema.hasTable("fact_partyroom_register"))) {
    await knex.schema.createTable("fact_partyroom_register", (table) => {
      table.increments("id");
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
}
