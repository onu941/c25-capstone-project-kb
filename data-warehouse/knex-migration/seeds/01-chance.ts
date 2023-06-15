import { Chance } from "chance";
import { Knex } from "knex";
const chance = Chance();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("staging_review").del();

    // Inserts seed entries
    await knex("staging_review").insert([
        ...Array.from({ length: 20 }, (_, i) => ({ 
            booking_review_source: chance.integer({ min:500000, max:600000}),
            booking_rating: chance.integer({ min:1, max:10})
        }))
    ]);
};
