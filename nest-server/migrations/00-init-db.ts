import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('image', (table) => {
    table.increments();
    table.string('filename');
  });

  await knex.schema.createTable('district', (table) => {
    table.increments();
    table.string('name', 32);
  });

  await knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name', 32);
    table.string('email', 255);
    table.string('phone', 32);
    table.string('password', 168);
    table.integer('image_id');
    table.foreign('image_id').references('image.id');
    table.boolean('is_admin');
    table.timestamps(false, true);
  });

  await knex.schema.createTable('partyroom', (table) => {
    table.increments();
    table.string('name', 128);
    table.integer('host_id');
    table.foreign('host_id').references('users.id');
    table.integer('district_id');
    table.foreign('district_id').references('district.id');
    table.integer('room_size');
    table.integer('capacity');
    table.string('phone', 32);
    table.string('address', 255);
    table.text('description');
    table.boolean('is_hidden');
    table.timestamps(false, true);
  });

  await knex.schema.createTable('partyroom_image', (table) => {
    table.increments();
    table.integer('partyroom_id');
    table.foreign('partyroom_id').references('partyroom.id');
    table.integer('image_id');
    table.foreign('image_id').references('image.id');
  });

  await knex.schema.createTable('category', (table) => {
    table.increments();
    table.string('name', 32);
  });

  await knex.schema.createTable('partyroom_category', (table) => {
    table.increments();
    table.integer('partyroom_id');
    table.foreign('partyroom_id').references('partyroom.id');
    table.integer('category_id');
    table.foreign('category_id').references('category.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('equipment', (table) => {
    table.increments();
    table.string('name', 32);
  });

  await knex.schema.createTable('partyroom_equipment', (table) => {
    table.increments();
    table.integer('partyroom_id');
    table.foreign('partyroom_id').references('partyroom.id');
    table.integer('equipment_id');
    table.foreign('equipment_id').references('equipment.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('partyroom_price_list', (table) => {
    table.increments();
    table.integer('partyroom_id');
    table.foreign('partyroom_id').references('partyroom.id');
    table.integer('headcount_price');
    table.boolean('is_holiday');
    table.time('start_time');
    table.integer('total_hour');
    table.integer('base_room_fee');
    table.timestamps(false, true);
  });

  await knex.schema.createTable('booking_info', (table) => {
    table.increments();
    table.integer('partyroom_price_list_id');
    table
      .foreign('partyroom_price_list_id')
      .references('partyroom_price_list.id');
    table.integer('booking_users_id');
    table.foreign('booking_users_id').references('users.id');
    table.integer('headcount');
    table.date('booking_date');
    table.time('start_time');
    table.integer('total_hour');
    table.integer('total_fee');
    table.string('special_request', 255);
    table.boolean('is_hidden');
    table.string('status', 255);
    table.timestamps(false, true);
  });

  // await knex.schema.createTable('chat', (table) => {
  //   table.increments();
  //   table.integer('sender_id');
  //   table.foreign('sender_id').references('users.id');
  //   table.integer('receiver_id');
  //   table.foreign('receiver_id').references('users.id');
  //   table.string('message', 500);
  //   table.string('filename', 255);
  //   table.timestamp('created_at').defaultTo(knex.fn.now());
  // });

  await knex.schema.createTable('review', (table) => {
    table.increments();
    table.integer('booking_info_id');
    table.foreign('booking_info_id').references('booking_info.id');
    table.integer('rating');
    table.string('detail', 255);
    table.boolean('is_hidden');
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('review');
  // await knex.schema.dropTable('chat');
  await knex.schema.dropTable('booking_info');
  await knex.schema.dropTable('partyroom_price_list');
  await knex.schema.dropTable('partyroom_equipment');
  await knex.schema.dropTable('partyroom_category');
  await knex.schema.dropTable('partyroom_image');
  await knex.schema.dropTable('equipment');
  await knex.schema.dropTable('category');
  await knex.schema.dropTable('partyroom');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('district');
  await knex.schema.dropTable('image');
}
