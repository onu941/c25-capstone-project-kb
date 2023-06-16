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

    await knex("staging_users_register").del();

    // Inserts seed entries
    await knex("staging_users_register").insert([
        ...Array.from({ length: 20 }, (_, i) => ({ 
            booking_user_source: chance.integer({ min: 10000, max: 10192 }),
            booking_user_promotion: chance.weighted(["corp", "sales", "earlyBird", "compensation", "event", "anniversary"], [0.14, 0.18, 0.31, 0.02, 0.16, 0.32])
        }))
    ]);
};
