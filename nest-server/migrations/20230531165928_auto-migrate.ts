import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.string("name", 32);
      table.string("email", 255);
      table.integer("phone", 255);
      table.string("password", 255);
      table.integer("image_id", 255).unsigned().references("image.id");
      table.string("bio", 255);
      table.boolean("is_admin");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("party_room"))) {
    await knex.schema.createTable("party_room", (table) => {
      table.increments("id");
      table.string("name", 32);
      table.integer("host_user_id").unsigned().references("user.id");
      table.integer("avg_rating");
      table.integer("party_room_image_id").unsigned().references("party_room_image.id");
      table.integer("district_id").unsigned().references("district.id");
      table.integer("capacity");
      table.integer("party_room_category_id").unsigned().references("party_room_category.id");
      table.integer("phone");
      table.string("address", 255);
      table.integer("party_room_equipment_id").unsigned().references("party_room_equipment.id");
      table.integer("party_room_price_list_id").unsigned().references("party_room_price_list.id");
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
        table.string("file_name", 255);
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
      table.integer("price_id").unsigned().references("price.id")
      table.integer("headcount");
      table.boolean("is_holiday");
      table.datetime("start_time");
      table.integer("total_hour");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("price"))) {
    await knex.schema.createTable("price", (table) => {
      table.increments("id");
      table.integer("price", 32);
    });
  }

  if (!(await knex.schema.hasTable("booking_info"))) {
    await knex.schema.createTable("booking_info", (table) => {
      table.increments("id");
      table.integer("party_room_id").unsigned().references("party_room.id");
      table.integer("booking_user_id").unsigned().references("user.id");
      table.integer("visitor");
    });
  }

  if (!(await knex.schema.hasTable("session"))) {
    await knex.schema.createTable("session", (table) => {
      table.increments("id");
      table.integer("booking_info_id").unsigned().references("booking_info.id");
      table.datetime("date");
      table.integer("time_slot_id").unsigned().references("time_slot.id");
      table.integer("total_amount")
      table.boolean("is_hidden");
    });
  }

  if (!(await knex.schema.hasTable("time_slot"))) {
    await knex.schema.createTable("time_slot", (table) => {
      table.increments("id");
      table.datetime("start_time");
    });
  }

  if (!(await knex.schema.hasTable("comment"))) {
    await knex.schema.createTable("comment", (table) => {
      table.increments("id");
      table.integer("party_room_id").unsigned().references("party_room.id");
      table.integer("comment_user_id").unsigned().references("user.id");
      table.integer("comment_image_id ").unsigned().references("comment_image.id");
      table.integer("rating");
      table.string("detail", 255);
      table.boolean("is_hidden");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("comment_image"))) {
    await knex.schema.createTable("comment_image", (table) => {
      table.increments("id");
      table.integer("comment_id").unsigned().references("comment.id");
      table.integer("image_id").unsigned().references("image.id");
    });
  }
}