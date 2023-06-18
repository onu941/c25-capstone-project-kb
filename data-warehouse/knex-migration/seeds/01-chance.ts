import { Chance } from "chance";
import { Knex } from "knex";
const chance = Chance();

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // await knex("staging_review").del();

    // // Inserts seed entries
    // await knex("staging_review").insert([
    //     ...Array.from({ length: 20 }, (_, i) => ({ 
    //         booking_review_application_db_id: chance.integer({ min:500000, max:600000}),
    //         booking_rating: chance.integer({ min:1, max:10})
    //     }))
    // ]);

    // await knex("staging_users_register").del();
    
    // // Inserts seed entries
    // await knex("staging_users_register").insert([
    //     ...Array.from({ length: 20 }, (_, i) => ({ 
    //         booking_users_application_db_id: chance.integer({ min: 10000, max: 10192 }),
    //         booking_users_promotion: chance.weighted(["corp", "sales", "earlyBird", "compensation", "event", "anniversary"], [0.14, 0.18, 0.31, 0.02, 0.16, 0.32])
    //     }))
    // ]);

    await knex("staging_booking").del();
    
    // Inserts seed entries
    await knex("staging_booking").insert([
        ...Array.from({ length: 10 }, (_, i) => ({ 
            year: chance.integer({max:2023, min:2020}),
            month: chance.integer({max:12, min:1}),
            day_of_month: chance.integer({max:31, min:1}),
            day_of_year: chance.integer({max:366, min:1}),
            date: chance.date(),
            quarter: chance.integer({max:4, min:1}),
            is_holiday: chance.bool(),
            day_of_week: chance.integer({max:7, min:1}),
            time: `${chance.hour()}:${chance.minute()}:${chance.second()}`,
            hour: chance.integer({max:12, min:0}),
            minute: chance.integer({max:60, min:0}),
            ampm: chance.weighted(["morning", "afternoon", "evening", "midnight"], [0.04, 0.32, 0.48, 0.16]),
            booking_users_promotion: chance.weighted(["corp", "sales", "earlyBird", "compensation", "event", "anniversary"], [0.14, 0.18, 0.31, 0.02, 0.16, 0.32]),
            booking_users_source: chance.integer({max:100, min:0}),
            host_users_id:chance.integer({max:100, min:0}),
            partyroom_source:chance.integer({max:100, min:0}),
            partyroom_district:chance.weighted(["Wan Chai","Kwun Tong","Yau Tsim Mong","Kwai Tsing","Tsuen Wan","Tuen Mun"], [0.06, 0.29, 0.42, 0.1, 0.09, 0.04]),
            partyroom_capacity:chance.integer({max:50, min:0}),
            booking_source:chance.integer({max:100, min:0}),
            total_hour:chance.integer({max:8, min:0}),
            headcount:chance.integer({max:20, min:0}),
            booking_fee:chance.integer({max:2000, min:0}),
            booking_review_rating:chance.integer({max:10, min:0})
        }))
    ]);
};
