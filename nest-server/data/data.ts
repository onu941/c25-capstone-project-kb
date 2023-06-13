import { districts } from './geography';
import {
  bookingInfo,
  category,
  equipment,
  image,
  partyroom,
  partyroomCategory,
  partyroomEquipment,
  partyroomImage,
  partyroomPriceList,
  users,
  review,
} from './interface';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

// export const imageSeedOld: image[] = [
//   { filename: 'example.jpg' },
//   { filename: 'image2.jpg' },
//   { filename: 'testing3.jpg' },
//   { filename: 'partyroom.jpg' },
//   { filename: 'awesome_party.jpg' },
//   { filename: 'partyrown.jpg' },
//   { filename: 'a_cool_room.jpg' },
//   { filename: 'incredible_room.jpg' },
// { filename: 'party_here.jpg' },
// { filename: 'party_hard.jpg' },
// { filename: '24hr_party_people.jpg' },
// { filename: 'great_time.jpg' },
// ];

export const imageSeed = () => {
  const imageData: image[] = [
    { filename: 'example.jpg' },
    { filename: 'image2.jpg' },
    { filename: 'testing3.jpg' },
    { filename: 'partyroom.jpg' },
    { filename: 'awesome_party.jpg' },
    { filename: 'partyrown.jpg' },
    { filename: 'a_cool_room.jpg' },
    { filename: 'incredible_room.jpg' },
    { filename: 'party_here.jpg' },
    { filename: 'party_hard.jpg' },
    { filename: '24hr_party_people.jpg' },
    { filename: 'great_time.jpg' },
  ];

  for (let i = 0; i < 38; i++) {
    const image: image = {
      filename: faker.system.commonFileName('jpg'),
    };
    imageData.push(image);
  }
  return imageData;
};

export const districtSeed = () => {
  return districts.map((district) => ({ name: district }));
};

export const usersSeed: users[] = [
  {
    name: 'kevin',
    email: 'kevinthekwok@gmail.com',
    phone: '90115762',
    password: 'password',
    image_id: 1,
    is_admin: false,
  },
  {
    name: 'clifford',
    email: 'clifford@gmail.com',
    phone: '96207529',
    password: 'password',
    image_id: 2,
    is_admin: false,
  },
];

export const partyroomSeed = () => {
  const partyroomData: partyroom[] = [];

  for (let i = 0; i < 10; i++) {
    const partyroom: partyroom = {
      name: faker.company.name(),
      host_id: faker.number.int({ min: 1, max: 2 }),
      district_id: faker.number.int({ min: 1, max: 93 }),
      room_size: faker.number.int({ min: 100, max: 5000 }),
      capacity: faker.number.int({ min: 1, max: 50 }),
      phone: faker.phone.number('9#######'),
      address: faker.location.streetAddress(true),
      description: faker.lorem.paragraph(6),
      is_hidden: false,
    };
    partyroomData.push(partyroom);
  }
  return partyroomData;
};

export const partyroomImageSeed = () => {
  const partyroomImageData: partyroomImage[] = [];

  for (let i = 0; i < 10; i++) {
    const partyroomImage: partyroomImage = {
      partyroom_id: i + 1,
      image_id: i + 3,
    };
    partyroomImageData.push(partyroomImage);
  }
  return partyroomImageData;
};

export const categorySeed: category[] = [
  { name: 'general' },
  { name: 'families' },
  { name: 'birthdays' },
  { name: 'dates' },
  { name: 'businesses' },
  { name: 'weddings' },
];

export const partyroomCategorySeed: partyroomCategory[] = [
  { partyroom_id: 1, category_id: 1 },
  { partyroom_id: 1, category_id: 2 },
  { partyroom_id: 1, category_id: 3 },
  { partyroom_id: 2, category_id: 4 },
  { partyroom_id: 2, category_id: 3 },
  { partyroom_id: 3, category_id: 1 },
  { partyroom_id: 3, category_id: 2 },
  { partyroom_id: 3, category_id: 5 },
  { partyroom_id: 4, category_id: 1 },
  { partyroom_id: 5, category_id: 1 },
  { partyroom_id: 6, category_id: 1 },
  { partyroom_id: 6, category_id: 5 },
  { partyroom_id: 7, category_id: 1 },
  { partyroom_id: 7, category_id: 4 },
  { partyroom_id: 7, category_id: 6 },
  { partyroom_id: 8, category_id: 4 },
  { partyroom_id: 9, category_id: 3 },
  { partyroom_id: 9, category_id: 4 },
  { partyroom_id: 10, category_id: 1 },
];

export const equipmentSeed: equipment[] = [
  { name: 'mahjong' },
  { name: 'bbq' },
  { name: 'karaoke' },
  { name: 'video games' },
  { name: 'board games' },
  { name: 'tv' },
];

export const partyroomEquipmentSeed: partyroomEquipment[] = [
  { partyroom_id: 1, equipment_id: 1 },
  { partyroom_id: 1, equipment_id: 2 },
  { partyroom_id: 1, equipment_id: 4 },
  { partyroom_id: 1, equipment_id: 5 },
  { partyroom_id: 1, equipment_id: 6 },
  { partyroom_id: 2, equipment_id: 1 },
  { partyroom_id: 2, equipment_id: 2 },
  { partyroom_id: 2, equipment_id: 4 },
  { partyroom_id: 2, equipment_id: 5 },
  { partyroom_id: 3, equipment_id: 1 },
  { partyroom_id: 3, equipment_id: 3 },
  { partyroom_id: 3, equipment_id: 4 },
  { partyroom_id: 3, equipment_id: 5 },
  { partyroom_id: 3, equipment_id: 6 },
  { partyroom_id: 4, equipment_id: 2 },
  { partyroom_id: 4, equipment_id: 3 },
  { partyroom_id: 4, equipment_id: 5 },
  { partyroom_id: 4, equipment_id: 6 },
  { partyroom_id: 5, equipment_id: 1 },
  { partyroom_id: 5, equipment_id: 2 },
  { partyroom_id: 5, equipment_id: 4 },
  { partyroom_id: 5, equipment_id: 5 },
  { partyroom_id: 6, equipment_id: 1 },
  { partyroom_id: 6, equipment_id: 3 },
  { partyroom_id: 6, equipment_id: 4 },
  { partyroom_id: 6, equipment_id: 5 },
  { partyroom_id: 6, equipment_id: 6 },
  { partyroom_id: 7, equipment_id: 2 },
  { partyroom_id: 7, equipment_id: 3 },
  { partyroom_id: 7, equipment_id: 5 },
  { partyroom_id: 7, equipment_id: 6 },
  { partyroom_id: 8, equipment_id: 1 },
  { partyroom_id: 8, equipment_id: 2 },
  { partyroom_id: 8, equipment_id: 5 },
  { partyroom_id: 8, equipment_id: 6 },
  { partyroom_id: 9, equipment_id: 1 },
  { partyroom_id: 9, equipment_id: 2 },
  { partyroom_id: 9, equipment_id: 3 },
  { partyroom_id: 9, equipment_id: 4 },
  { partyroom_id: 9, equipment_id: 6 },
  { partyroom_id: 10, equipment_id: 1 },
  { partyroom_id: 10, equipment_id: 4 },
  { partyroom_id: 10, equipment_id: 5 },
  { partyroom_id: 10, equipment_id: 6 },
];

// ***************************** //
// partyroomPriceListSeed readme //
// ***************************** //
// users may only book fixed intervals of time
// these fixed intervals of time are defined by a partyroom's "price lists"
// the price lists are defined by the partyroom owner and have two variables
// 1) starting time of the interval; 2) total hours that make up the interval
// during that interval, using the partyroom will have a set price
// the partyroom owner may make as many price lists as they please

export const partyroomPriceListSeed: partyroomPriceList[] = [
  {
    partyroom_id: 1,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 1,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 1,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 1,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 2,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 2,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 2,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 2,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 3,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 3,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 3,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 3,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 4,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 4,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 4,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 4,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 5,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 5,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 5,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 5,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 6,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 6,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 6,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 6,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 7,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 7,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 7,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 7,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 8,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 8,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 8,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 8,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 9,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 9,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 9,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 10,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 10,
    headcount_price: 50,
    is_holiday: false,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 10,
    headcount_price: 50,
    is_holiday: false,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 10,
    headcount_price: 100,
    is_holiday: true,
    start_time: '10:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
  {
    partyroom_id: 10,
    headcount_price: 100,
    is_holiday: true,
    start_time: '18:00',
    total_hour: 8,
    base_room_fee: 1000,
  },
];

export const bookingInfoSeed = () => {
  const bookingInfoData: bookingInfo[] = [];
  const status: string[] = ['confirmed', 'confirmed', 'confirmed'];

  for (let i = 0; i < 16; i++) {
    const randomStatus: string =
      status[Math.floor(Math.random() * status.length)];

    const bookingInfo: bookingInfo = {
      partyroom_price_list_id: faker.number.int({ min: 1, max: 40 }),
      booking_users_id: faker.number.int({ min: 1, max: 2 }),
      headcount: faker.number.int({ min: 2, max: 15 }),
      booking_date: format(
        faker.date.recent({
          days: 30,
          refDate: '2023-06-01T00:00:00.000+08:00',
        }),
        'yyyy-MM-dd',
      ),
      total_fee: faker.number.int({ min: 1000, max: 5000 }),
      special_request: faker.lorem.sentence(5),
      is_hidden: false,
      status: randomStatus,
    };
    bookingInfoData.push(bookingInfo);
  }
  return bookingInfoData;
};

export const reviewSeed = () => {
  const reviewData: review[] = [];

  for (let i = 0; i < 10; i++) {
    const review: review = {
      booking_info_id: faker.number.int({ min: 1, max: 10 }),
      rating: faker.number.int(10),
      detail: faker.lorem.sentence(5),
      is_hidden: false,
    };
    reviewData.push(review);
  }
  return reviewData;
};
