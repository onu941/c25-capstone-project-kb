import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const tables = [
    'review',
    'booking_info',
    'partyroom_price_list',
    'partyroom_equipment',
    'partyroom_category',
    'partyroom_image',
    'equipment',
    'category',
    'partyroom',
    'users',
    'district',
    'image',
  ];
  for (const table of tables) {
    await knex.raw(`TRUNCATE ${table} RESTART IDENTITY CASCADE;`);
  }
}
