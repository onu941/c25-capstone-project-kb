import Chance from "chance"

const chance = Chance();


for (let i = 0; i < 2; i++) {
console.log(
"9842 set of booking",
chance.year({min: 2020, max: 2023}),
chance.date(),

chance.integer({ min: 4, max: 8 }),
chance.integer({ min: 1, max: 20 }),
chance.integer({ min: 260, max: 3600 }),
chance.integer({ min: 1, max: 10 }),
chance.integer({ min: 10000, max: 10192 }),

chance.integer({ min: 1, max: 20 }),
)}

// fact_booking
// --------------
// source string
// total_hour numberic(4,2)
// headcount integer
// booking_fee numeric(7,2)
// rating decimal(3,1)



console.log(
"fact_booking",
"source:",chance.integer({ min: 100000000, max: 200000000 }),
"total_hour:",chance.integer({ min: 4, max: 8 }),
"headcount:",chance.integer({ min: 1, max: 20 }),
"booking_fee: headcount*total hour*",chance.integer({ min: 38, max: 140 }),
)

// dim_review
// ----------
// id integer PK
// review_id FK - fact_review.id
// rating decimal(3,1)

const rating = [1,2,3,4,5,6,7,8,9,10];
const ratingChance = [0.15,0.01,0.03,0.02,0.1,0.04,0.12,0.27,0.08,0.18];
console.log(
"rating:",chance.weighted(rating, ratingChance)
)

// fact_review
// -----------
// id integer PK
// source string

console.log(
"source:",chance.integer({min:100000, max:200000})
)

// dim_date
// --------
// id integer PK
// year integer
// month integer
// day_of_month integer
// day_of_year integer
// date string
// quarter integer
// is_holiday boolean
// day_of_week integer

console.log(
"year:",chance.year({min: 2020, max: 2023}),
"date:",chance.date(),
"is_holiday:",chance.bool({likelihood: 82})
)

// dim_time
// -----------
// id integer PK
// time time
// hour integer
// minute integer
// AMPM string

const AMPM = ["morning", "afternoon", "evening", "midnight"];
const AMPMChance = [0.04, 0.32, 0.48, 0.16];

console.log(
"AMPM:",chance.weighted(AMPM, AMPMChance),
)

// dim_users
// ---------
// id integer PK
// promotion string
// user_register_id FK - fact_users_register.id

const promotion = ["corp", "sales", "earlyBird", "compensation", "event", "anniversary"];
const promotionChance = [0.14, 0.18, 0.31, 0.02, 0.16, 0.32];

console.log(
"promotion:",chance.weighted(promotion, promotionChance)
)

// dim_partyroom
// --------------
// id integer PK
// host_users_id integer
// partyroom_register_id FK - fact_partyroom_register.id
// district varchar(255)
// capacity integer

const district = ["Wan Chai","Kwun Tong","Yau Tsim Mong","Kwai Tsing","Tsuen Wan","Tuen Mun"];
const districtChance = [0.06, 0.29, 0.42, 0.1, 0.09, 0.04];

console.log(
"host_users_id:",chance.integer({ min: 10000, max: 10192 }),
"district:",chance.weighted(district, districtChance),
"capacity:",chance.integer({ min: 1, max: 20 })
)


// dim_partyroom_equipment
// -----------------------
// id integer PK
// partyroom_id FK >0- dim_partyroom.id
// equipment_id FK >0- dim_equipment.id
// start_date datetime
// end_date datetime

console.log(
"start_date:",chance.date({year: 2023})
)

// dim_equipment
// -------
// id integer PK
// name varchar(255)
const equipment = ["mahjong","bbq","karaoke","video games","board games","tv"]
const equipmentChance = [0.15,0.05,0.25,0.1,0.3,0.15]
console.log(
"equipment:",chance.weighted(equipment,equipmentChance)
)

// dim_partyroom_category
// -----------------------
// id integer PK
// partyroom_id FK >0- dim_partyroom.id
// category_id FK >0- dim_category.id
// start_date datetime
// end_date datetime

console.log(
"start_date:",chance.date({year: 2023})
)

// dim_category
// -------
// id integer PK
// name varchar(255)
const category = ["general","families","birthdays","dates","business","weddings"]
const categoryChance = [0.2,0.2,0.2,0.2,0.05,0.15]
console.log(
"category:",chance.weighted(category,categoryChance)
)

// fact_partyroom_register
// -----------------------
// id integer PK
// avg_rating decimal(3,1)
// source string
// start_date datetime
// end_date datetime

console.log(
"source:",chance.integer({min: 100000, max: 100220}),
"start_date:",chance.date({year: 2023})
)

// fact_users_register
// ----------
// id integer PK
// source string

console.log(
"source:",chance.integer({ min: 10000, max: 10192 })
)

