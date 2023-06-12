import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  try {
    // Inserts seed entries
    await knex('table_name').insert([
      { id: 1, colName: 'rowValue1' },
      { id: 2, colName: 'rowValue2' },
      { id: 3, colName: 'rowValue3' },
    ]);
  } catch (error) {}
}
