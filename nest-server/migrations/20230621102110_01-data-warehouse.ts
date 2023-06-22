import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('etl_partyroom', (table) => {
        table.increments();
        table.string('partyroom_source').unique();
        table.decimal('avg_rating',3,1);
      });

    await knex.schema.createTable('etl_booking', (table) => {
        table.increments();
        table.integer('year');
        table.integer('month');
        table.date('date');
        table.integer('quarter');
        table.string('ampm', 255);
        table.string('booking_source',255)
        table.string('partyroom_source', 255).unsigned();
        table.decimal('booking_fee',7,2);
        table.integer('booking_review_rating');
        table.timestamps(false, true);
      });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('etl_booking');
    await knex.schema.dropTable('etl_partyroom');
}


