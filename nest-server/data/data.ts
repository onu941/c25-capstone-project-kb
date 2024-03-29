import { districts } from "./geography";
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
} from "./interface";
import { faker } from "@faker-js/faker";
// import { format } from "date-fns";

export const imageSeed: image[] = [
  { filename: "kevin" },
  { filename: "clifford" },
  { filename: "jane" },
  { filename: "bob" },
  { filename: "susan" },
  { filename: "sharon" },
  { filename: "mina" },
  { filename: "jason" },
  { filename: "partyroom_1.jpg" },
  { filename: "partyroom_2.jpg" },
  { filename: "partyroom_3.jpg" },
  { filename: "partyroom_4.jpg" },
  { filename: "partyroom_5.jpg" },
  { filename: "partyroom_6.jpg" },
  { filename: "partyroom_7.jpg" },
  { filename: "partyroom_8.jpg" },
  { filename: "partyroom_9.jpg" },
  { filename: "partyroom_10.jpg" },
  { filename: "partyroom_11.jpg" },
  { filename: "partyroom_12.jpg" },
  { filename: "partyroom_13.jpg" },
  { filename: "partyroom_14.jpg" },
  { filename: "partyroom_15.jpg" },
  { filename: "partyroom_16.jpg" },
  { filename: "partyroom_17.jpg" },
  { filename: "partyroom_18.jpg" },
  { filename: "partyroom_19.jpg" },
  { filename: "partyroom_20.jpg" },
  { filename: "partyroom_21.jpg" },
  { filename: "partyroom_22.jpg" },
  { filename: "partyroom_23.jpg" },
  { filename: "partyroom_24.jpg" },
];

export const districtSeed = () => {
  return districts.map((district) => ({ name: district }));
};

export const usersSeed: users[] = [
  {
    name: "Kevin",
    email: "kevinthekwok@gmail.com",
    phone: "90115762",
    password: "password",
    image_id: 1,
    is_admin: false,
  },
  {
    name: "Clifford",
    email: "clifford@gmail.com",
    phone: "96207529",
    password: "password",
    image_id: 2,
    is_admin: false,
  },
  {
    name: "Jane",
    email: "jane@gmail.com",
    phone: "95043106",
    password: "password",
    image_id: 3,
    is_admin: false,
  },
  {
    name: "Bob",
    email: "bob@gmail.com",
    phone: "91918854",
    password: "password",
    image_id: 4,
    is_admin: false,
  },
  {
    name: "Susan",
    email: "susan@gmail.com",
    phone: "91234567",
    password: "password",
    image_id: 5,
    is_admin: false,
  },
  {
    name: "Sharon",
    email: "sharon@gmail.com",
    phone: "61234567",
    password: "password",
    image_id: 6,
    is_admin: false,
  },
];

export const partyroomSeed: partyroom[] = [
  {
    name: `Kevin's Partyroom`,
    host_id: 1,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "90115762",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
  {
    name: `Clifford's Partyroom`,
    host_id: 2,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "96207529",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
  {
    name: `Jane's Partyroom`,
    host_id: 3,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "95043106",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
  {
    name: `Bob's Partyroom`,
    host_id: 4,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "91918854",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
  {
    name: `Susan's Partyroom`,
    host_id: 5,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "91234567",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
  {
    name: `Sharon's Partyroom`,
    host_id: 6,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "61234567",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
  {
    name: `Kevin's 2nd Partyroom`,
    host_id: 1,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "90115762",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
  {
    name: `Clifford's 2nd Partyroom`,
    host_id: 2,
    district_id: faker.number.int({ min: 1, max: 6 }),
    room_size: faker.number.int({ min: 100, max: 5000 }),
    capacity: faker.number.int({ min: 1, max: 50 }),
    phone: "96207529",
    address: faker.location.streetAddress(true),
    description: faker.lorem.paragraph(6),
    is_hidden: false,
  },
];

export const partyroomImageSeed = () => {
  const partyroomImageData: partyroomImage[] = [];

  for (let i = 0; i < partyroomSeed.length; i++) {
    partyroomImageData.push(
      {
        partyroom_id: i + 1,
        image_id: faker.number.int({ min: 9, max: 32 }),
      },
      {
        partyroom_id: i + 1,
        image_id: faker.number.int({ min: 9, max: 32 }),
      },
      {
        partyroom_id: i + 1,
        image_id: faker.number.int({ min: 9, max: 32 }),
      }
    );
  }
  return partyroomImageData;
};

export const categorySeed: category[] = [
  { name: "general" },
  { name: "families" },
  { name: "birthdays" },
  { name: "dates" },
  { name: "businesses" },
  { name: "weddings" },
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
];

export const equipmentSeed: equipment[] = [
  { name: "mahjong" },
  { name: "bbq" },
  { name: "karaoke" },
  { name: "video games" },
  { name: "board games" },
  { name: "tv" },
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
];

export const partyroomPriceListSeed = () => {
  let partyroomPriceLists: partyroomPriceList[] = [];

  for (let i = 0; i < 8; i++) {
    partyroomPriceLists.push(
      {
        partyroom_id: i + 1,
        headcount_price: 50,
        is_holiday: false,
        start_time: "10:00",
        total_hour: 8,
        base_room_fee: 1000,
      },
      {
        partyroom_id: i + 1,
        headcount_price: 50,
        is_holiday: false,
        start_time: "18:00",
        total_hour: 8,
        base_room_fee: 1000,
      },
      {
        partyroom_id: i + 1,
        headcount_price: 100,
        is_holiday: true,
        start_time: "10:00",
        total_hour: 14,
        base_room_fee: 1000,
      }
    );
  }

  return partyroomPriceLists;
};

export const bookingInfoSeed: bookingInfo[] = [
  {
    partyroom_price_list_id: 5,
    booking_users_id: 1,
    headcount: 6,
    booking_date: "2023-05-03",
    total_fee: 5000,
    special_request: "",
    is_hidden: false,
    status: "Confirmed",
  },
  {
    partyroom_price_list_id: 19,
    booking_users_id: 1,
    headcount: 4,
    booking_date: "2023-05-15",
    total_fee: 5000,
    special_request: "",
    is_hidden: false,
    status: "Confirmed",
  },
  {
    partyroom_price_list_id: 10,
    booking_users_id: 1,
    headcount: 11,
    booking_date: "2023-05-29",
    total_fee: 5000,
    special_request: "",
    is_hidden: false,
    status: "Confirmed",
  },
  {
    partyroom_price_list_id: 6,
    booking_users_id: 1,
    headcount: 10,
    booking_date: "2023-06-01",
    total_fee: 5000,
    special_request: "disposable gloves",
    is_hidden: false,
    status: "Confirmed",
  },
  {
    partyroom_price_list_id: 20,
    booking_users_id: 1,
    headcount: 12,
    booking_date: "2023-06-12",
    total_fee: 5000,
    special_request: "slippers",
    is_hidden: false,
    status: "Confirmed",
  },

  {
    partyroom_price_list_id: 3,
    booking_users_id: 2,
    headcount: 8,
    booking_date: "2023-07-08",
    total_fee: 5000,
    special_request: "mario for switch",
    is_hidden: false,
    status: "Pending",
  },
  {
    partyroom_price_list_id: 1,
    booking_users_id: 2,
    headcount: 16,
    booking_date: "2023-07-10",
    total_fee: 5000,
    special_request: "extra cups, glasses",
    is_hidden: false,
    status: "Pending",
  },
  {
    partyroom_price_list_id: 8,
    booking_users_id: 1,
    headcount: 2,
    booking_date: "2023-07-21",
    total_fee: 5000,
    special_request: "",
    is_hidden: false,
    status: "Pending",
  },
];

export const reviewSeed: review[] = [
  {
    booking_info_id: 1,
    rating: faker.number.int({ min: 8, max: 10 }),
    detail: faker.lorem.sentence(5),
    is_hidden: false,
  },
  {
    booking_info_id: 2,
    rating: faker.number.int({ min: 8, max: 10 }),
    detail: faker.lorem.sentence(5),
    is_hidden: false,
  },
  {
    booking_info_id: 3,
    rating: faker.number.int({ min: 8, max: 10 }),
    detail: faker.lorem.sentence(5),
    is_hidden: false,
  },
  {
    booking_info_id: 4,
    rating: faker.number.int({ min: 8, max: 10 }),
    detail: faker.lorem.sentence(5),
    is_hidden: false,
  },
  {
    booking_info_id: 5,
    rating: faker.number.int({ min: 8, max: 10 }),
    detail: faker.lorem.sentence(5),
    is_hidden: false,
  },
];
