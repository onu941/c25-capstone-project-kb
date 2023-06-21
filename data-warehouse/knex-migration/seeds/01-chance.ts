import { Chance } from "chance";
import { Knex } from "knex";
const chance = Chance();

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // await knex("staging_registered_users").del();
    
    // // Inserts seed entries
    // await knex("staging_registered_users").insert([
    //     ...Array.from({ length: 2321 }, (_, i) => ({ 
    //         users_source: "testing_db=" + (i + 1000001),
    //         users_promotion: chance.weighted(["corp", "sales", "earlyBird", "others", "no promotion code"], [0.14, 0.18, 0.32, 0.01, 0.48
    //         ])
    //     }))
    // ]);

    // await knex("staging_registered_partyroom").del();
    
    // interface Partyroom {
    //     avg_rating: number;
    //     host_users_id: number;
    //     partyroom_source: string;
    //     district: string;
    //     capacity: number;
    //     base_room_fee: number;
    //     partyroom_start_date: any;
    //     partyroom_end_date: string;
    //     category_name: string;
    //     category_start_date: string;
    //     category_end_date: string;
    //     equipment_name: string;
    //     equipment_start_date: string;
    //     equipment_end_date: string;
    //     price_list_start_date: string;
    //     price_list_end_date: string;
    //     headcount_price: number;
    //     is_holiday: boolean;
    //     start_time: string;
    //     ampm: string;
    //     total_hour: number;
    //   }
      
    //   const partyroom_data: Partyroom[] = [];
      
    //   for (let i = 1; i < 562; i++) {
    //     const dataSet: Partyroom[] = [];

    //     let host_users_id = chance.integer({ max: 1002321, min: 1000001 })
    //     let district = chance.weighted(
    //         ["Wan Chai", "Kwun Tong", "Yau Tsim Mong", "Kwai Tsing", "Tsuen Wan", "Tuen Mun"],
    //         [0.06, 0.29, 0.42, 0.1, 0.09, 0.04]
    //       )
    //     let capacity = chance.integer({ max: 20, min: 1 })
    //     let base_room_fee = chance.integer({ max: 220, min: 40 })
    //     let partyroom_start_date = chance.date({ year: 2023 })
        
      
    //     for (let j = 1; j < chance.integer({max:5, min:1}); j++) {
    //       let category_name = chance.weighted(
    //           ["general", "families", "birthdays", "dates", "business", "weddings"],
    //           [0.2, 0.2, 0.2, 0.2, 0.05, 0.15]
    //         )
    //       let equipment_name = chance.weighted(
    //           ["mahjong", "bbq", "karaoke", "video games", "board games", "tv"],
    //           [0.15, 0.05, 0.25, 0.1, 0.3, 0.15]
    //         )
    //       let start_time_var = chance.weighted(["08:00", "12:00", "18:00", "00:00"], [0.04, 0.32, 0.48, 0.16])
    //       let ampm_var
    //       let headcount_price = chance.integer({ max: 160, min: 40 })
    //       let is_holiday = chance.bool()
    //       let total_hour = chance.integer({ max: 8, min: 4 })

    //       if (start_time_var == "08:00") {
    //           ampm_var = "morning"
    //       } else if (start_time_var = "12:00") {
    //           ampm_var = "afternoon"
    //       } else if (start_time_var = "18:00") {
    //           ampm_var = "evening"
    //       } else {
    //           ampm_var = "midnight"
    //       } 

    //       dataSet.push({
    //         avg_rating: 0,
    //         host_users_id: host_users_id,
    //         partyroom_source: "testing_db=" + (i + 1000000),
    //         district: district,
    //         capacity: capacity,
    //         base_room_fee: base_room_fee,
    //         partyroom_start_date: partyroom_start_date,
    //         partyroom_end_date: "TBC",
    //         category_name: category_name,
    //         category_start_date: "2023-01-01",
    //         category_end_date: "TBC",
    //         equipment_name: equipment_name,
    //         equipment_start_date: "2023-01-01",
    //         equipment_end_date: "TBC",
    //         price_list_start_date: "2023-01-01",
    //         price_list_end_date: "TBC",
    //         headcount_price: headcount_price,
    //         is_holiday: is_holiday,
    //         start_time: start_time_var,
    //         ampm: ampm_var,
    //         total_hour: total_hour,
    //       });
    //     }
      
    //     partyroom_data.push(...dataSet);
    //   }
      
    // await knex("staging_registered_partyroom").insert(partyroom_data);
   
    // await knex("staging_booking").del();

    interface Booking {
        year: number;
        month: number;
        day_of_month: number;
        day_of_year: number;
        date: Date;
        quarter: number;
        is_holiday: boolean;
        day_of_week: number;
        time: string;
        hour: number;
        minute: number;
        ampm: string;
        booking_users_promotion: string;
        booking_users_source: string;
        host_users_id: number;
        partyroom_source: string;
        partyroom_district: string;
        partyroom_capacity: number;
        booking_source: string;
        total_hour: number;
        headcount: number;
        booking_fee: number;
        booking_review_rating: number;
      }
      
      const booking_data: Booking[] = [];
      
      for (let i = 1; i < 6686; i++) {
        const dataSet: Booking[] = [];    

        let year = chance.integer({max:2023, min:2020})
        function getDayOfYear(date: Date): number {
          const yearStart = new Date(date.getFullYear(), 0, 0);
          const diff = (date.getTime() - yearStart.getTime()) + ((yearStart.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
          const oneDay = 1000 * 60 * 60 * 24;
          return Math.floor(diff / oneDay);
        }

        let hour = chance.weighted([8, 12, 18, 0], [0.04, 0.32, 0.48, 0.16])
        let ampm
        if (hour == 8) {
            ampm = "morning"
        } else if (hour == 12) {
            ampm = "afternoon"
        } else if (hour == 18) {
            ampm = "evening"
        } else {
            ampm = "midnight"
        } 

        let partyroom_capacity = chance.integer({max:20, min:1})
        let headcount = chance.integer({max:partyroom_capacity, min:1})
        let booking_fee = chance.integer({ max: 220, min: 40 }) + headcount * chance.integer({ max: 160, min: 40 })
        let randomDate = new Date(chance.date({year:year}))
          dataSet.push({
            year: randomDate.getFullYear(),
            month: randomDate.getMonth(),
            day_of_month: randomDate.getDate(),
            day_of_year: getDayOfYear(randomDate),
            date:randomDate,
            quarter: Math.ceil(randomDate.getMonth()/3),
            is_holiday: chance.bool({ likelihood: 82 }),
            day_of_week: randomDate.getDay(),
            time: `${hour}:00:00`,
            hour: hour,
            minute: 0,
            ampm: ampm,
            booking_users_promotion: chance.weighted(["corp", "sales", "earlyBird", "compensation", "event", "anniversary"], [0.14, 0.18, 0.31, 0.02, 0.16, 0.32]),
            booking_users_source: "testing_db=" + chance.integer({max:1002321, min:1000001}),
            host_users_id:chance.integer({max:1002321, min:1000001}),
            partyroom_source:"testing_db=" + chance.integer({max:1000562, min:1000001}),
            partyroom_district:chance.weighted(["Wan Chai","Kwun Tong","Yau Tsim Mong","Kwai Tsing","Tsuen Wan","Tuen Mun"], [0.06, 0.29, 0.42, 0.1, 0.09, 0.04]),
            partyroom_capacity:partyroom_capacity,
            booking_source:"testing_db=" + (i + 1000000),
            total_hour:chance.integer({max:8, min:1}),
            headcount:headcount,
            booking_fee:booking_fee,
            booking_review_rating:chance.weighted([1,2,3,4,5,6,7,8,9,10],[0.15,0.01,0.03,0.02,0.1,0.04,0.12,0.27,0.08,0.18])
          });
      
        booking_data.push(...dataSet);
      }
    
    await knex("staging_booking").insert(booking_data);
};
