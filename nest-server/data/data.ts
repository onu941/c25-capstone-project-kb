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
// ];

export const imageSeed = () => {
  const imageData: image[] = [
    { filename: 'example.jpg' },
    { filename: 'image2.jpg' },
  ];

  for (let i = 0; i < 48; i++) {
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
      name: faker.music.songName(),
      host_id: faker.number.int({ min: 1, max: 2 }),
      district_id: faker.number.int({ min: 1, max: 93 }),
      capacity: faker.number.int({ min: 1, max: 50 }),
      phone: faker.phone.number('########'),
      address: faker.location.streetAddress(true),
      description: faker.lorem.sentence(15),
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

export const partyroomCategorySeed = () => {
  const partyroomCategoryData: partyroomCategory[] = [];

  for (let i = 0; i < 10; i++) {
    const partyroomCategory: partyroomCategory = {
      partyroom_id: i + 1,
      category_id: faker.number.int({ min: 1, max: 6 }),
    };
    partyroomCategoryData.push(partyroomCategory);
  }
  return partyroomCategoryData;
};

export const equipmentSeed: equipment[] = [
  { name: 'mahjong' },
  { name: 'bbq' },
  { name: 'karaoke' },
  { name: 'video games' },
  { name: 'board games' },
  { name: 'tv' },
];

export const partyroomEquipmentSeed = () => {
  const partyroomEquipmentData: partyroomEquipment[] = [];

  for (let i = 0; i < 10; i++) {
    const partyroomEquipment: partyroomEquipment = {
      partyroom_id: i + 1,
      equipment_id: faker.number.int({ min: 1, max: 6 }),
    };
    partyroomEquipmentData.push(partyroomEquipment);
  }
  return partyroomEquipmentData;
};

export const partyroomPriceListSeed = () => {
  const partyroomPriceListData: partyroomPriceList[] = [];

  for (let i = 0; i < 10; i++) {
    const partyroomPriceList: partyroomPriceList = {
      partyroom_id: i + 1,
      headcount_price: faker.number.int({ min: 50, max: 100 }),
      is_holiday: false,
      start_time: format(faker.date.recent(), 'HH:mm'), // what is this actually
      total_hour: faker.number.int({ min: 1, max: 10 }),
      base_room_fee: faker.number.int({ min: 500, max: 5000 }),
    };
    partyroomPriceListData.push(partyroomPriceList);
  }
  return partyroomPriceListData;
};

export const bookingInfoSeed = () => {
  const bookingInfoData: bookingInfo[] = [];
  const status: string[] = ['pending', 'confirmed', 'void'];

  for (let i = 0; i < 10; i++) {
    const randomStatus: string =
      status[Math.floor(Math.random() * status.length)];

    const bookingInfo: bookingInfo = {
      partyroom_price_list_id: i + 1,
      booking_users_id: faker.number.int({ min: 1, max: 2 }),
      headcount: faker.number.int({ min: 2, max: 15 }),
      booking_date: format(
        faker.date.recent({
          days: 30,
          refDate: '2023-06-01T00:00:00.000+08:00',
        }),
        'yyyy-MM-dd',
      ),
      start_time: format(
        faker.date.soon({
          days: 40,
          refDate: '2023-06-01T00:00:00.000+08:00',
        }),
        'HH:mm',
      ),
      total_hour: faker.number.int({ min: 2, max: 10 }),
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
