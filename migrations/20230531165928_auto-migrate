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

  if (!(await knex.schema.hasTable("partyRoom"))) {
    await knex.schema.createTable("partyRoom", (table) => {
      table.increments("id");
      table.string("name", 32);
      table.integer("host_user_id").unsigned().references("user.id");
      table.integer("rating");
      table.integer("partRoomImage_id").unsigned().references("partRoomImage.id");
      table.integer("area_id").unsigned().references("area.id");
      table.integer("capacity");
      table.integer("category_id").unsigned().references("category.id");
      table.integer("phone");
      table.string("address", 255);
      table.integer("equipment_id").unsigned().references("equipment.id");
      table.integer("priceList_id").unsigned().references("priceList.id");
      table.string("detail", 255);
      table.boolean("is_hidden");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("image"))) {
    await knex.schema.createTable("image", (table) => {
      table.increments("id");
      table.string("content", 255);
    });
  }

  if (!(await knex.schema.hasTable("partyRoomImage"))) {
    await knex.schema.createTable("partyRoomImage", (table) => {
      table.increments("id");
      table.integer("partyRoom_id").unsigned().references("partyRoom.id");
      table.integer("image_id").unsigned().references("image.id");
    });
  }

  if (!(await knex.schema.hasTable("area"))) {
    await knex.schema.createTable("area", (table) => {
      table.increments("id");
      table.string("name", 30);
    });
  }

  if (!(await knex.schema.hasTable("category"))) {
    await knex.schema.createTable("category", (table) => {
      table.increments("id");
      table.string("name", 30);
    });
  }

  if (!(await knex.schema.hasTable("equipment"))) {
    await knex.schema.createTable("equipment", (table) => {
      table.increments("id");
      table.string("name", 30);
    });
  }

  if (!(await knex.schema.hasTable("priceList"))) {
    await knex.schema.createTable("priceList", (table) => {
      table.increments("id");
      table.integer("partyRoom_id").unsigned().references("partyRoom.id");
      table.integer("visitor");
      table.integer("price");
    });
  }

  if (!(await knex.schema.hasTable("bookingInfo"))) {
    await knex.schema.createTable("bookingInfo", (table) => {
      table.increments("id");
      table.integer("partyRoom_id").unsigned().references("partyRoom.id");
      table.integer("booking_user_id").unsigned().references("user.id");
      table.integer("visitor");
    });
  }

  if (!(await knex.schema.hasTable("session"))) {
    await knex.schema.createTable("session", (table) => {
      table.increments("id");
      table.integer("bookingInfo_id").unsigned().references("bookingInfo.id");
      table.integer("date");
      table.integer("timeSlot_id").unsigned().references("timeSlot.id");
      table.boolean("is_hidden");
    });
  }

  if (!(await knex.schema.hasTable("timeSlot"))) {
    await knex.schema.createTable("timeSlot", (table) => {
      table.increments("id");
      table.integer("time");
    });
  }

  if (!(await knex.schema.hasTable("comment"))) {
    await knex.schema.createTable("comment", (table) => {
      table.increments("id");
      table.integer("partyRoom_id").unsigned().references("partyRoom.id");
      table.integer("user_id").unsigned().references("user.id");
      table.integer("commentImage_id ").unsigned().references("commentImage.id");
      table.integer("rating");
      table.string("detail", 255);
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("commentImage"))) {
    await knex.schema.createTable("commentImage", (table) => {
      table.increments("id");
      table.integer("comment_id").unsigned().references("comment.id");
      table.integer("image_id").unsigned().references("image.id");
    });
  }
}