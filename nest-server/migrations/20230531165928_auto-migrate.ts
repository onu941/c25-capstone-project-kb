import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("name", 32);
      table.string("email", 255);
      table.string("phone", 32);
      table.string("password", 168);
      table.integer("image_id", 255).unsigned().references("image.id");
      table.boolean("is_admin");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("party_room"))) {
    await knex.schema.createTable("party_room", (table) => {
      table.increments("id");
      table.string("name", 32);
      table.integer("host_id").unsigned().references("users.id");
      table.integer("party_room_image_id").unsigned().references("party_room_image.id");
      table.integer("district_id").unsigned().references("district.id");
      table.integer("capacity");
      table.string("phone", 32);
      table.string("address", 255);
      table.string("detail", 255);
      table.boolean("is_hidden");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("party_room_image"))) {
    await knex.schema.createTable("party_room_image", (table) => {
      table.increments("id");
      table.integer("party_room_id").unsigned().references("party_room.id");
      table.integer("image_id").unsigned().references("image.id");
    });
  }

  if (!(await knex.schema.hasTable("image"))) {
      await knex.schema.createTable("image", (table) => {
        table.increments("id");
        table.string("filename", 255);
      });
    }

  if (!(await knex.schema.hasTable("district"))) {
    await knex.schema.createTable("district", (table) => {
      table.increments("id");
      table.string("name", 32);
    });
  }

  if (!(await knex.schema.hasTable("party_room_category"))) {
    await knex.schema.createTable("party_room_category", (table) => {
      table.increments("id");
      table.integer("party_room_id").unsigned().references("party_room.id");
      table.integer("category_id").unsigned().references("category.id");
    });
  }

  if (!(await knex.schema.hasTable("category"))) {
    await knex.schema.createTable("category", (table) => {
      table.increments("id");
      table.string("name", 32);
    });
  }

  if (!(await knex.schema.hasTable("party_room_equipment"))) {
    await knex.schema.createTable("party_room_equipment", (table) => {
      table.increments("id");
      table.integer("party_room_id").unsigned().references("party_room.id");
      table.integer("equipment_id").unsigned().references("equipment.id");
    });
  }

  if (!(await knex.schema.hasTable("equipment"))) {
    await knex.schema.createTable("equipment", (table) => {
      table.increments("id");
      table.string("name", 32);
    });
  }

  if (!(await knex.schema.hasTable("party_room_price_list"))) {
    await knex.schema.createTable("party_room_price_list", (table) => {
      table.increments("id");
      table.integer("party_room_id").unsigned().references("party_room.id");
      table.integer("headcount");
      table.boolean("is_holiday");
      table.datetime("start_time");
      table.integer("total_hour");
      table.integer("base_room_fee");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("booking_info"))) {
    await knex.schema.createTable("booking_info", (table) => {
      table.increments("id");
      table.integer("party_room_id").unsigned().references("party_room.id");
      table.integer("booking_users_id").unsigned().references("users.id");
      table.integer("headcount");
      table.date("booking_date");
      table.datetime("start_time");
      table.integer("total_hour");
      table.integer("total_fee");
      table.string("special_request", 255);
      table.boolean("is_hidden");
      table.string("status", 255);
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("chat"))) {
    await knex.schema.createTable("chat", (table) => {
      table.increments("id");
      table.integer("sender_id").unsigned().references("users.id");
      table.integer("receiver_id").unsigned().references("users.id");
      table.string("message", 255);
      table.string("filename", 255);
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("review"))) {
    await knex.schema.createTable("review", (table) => {
      table.increments("id");
      table.integer("booking_info_id").unsigned().references("booking_info.id");
      table.integer("rating");
      table.string("detail", 255);
      table.boolean("is_hidden");
      table.timestamps(false, true);
    });
  }}
