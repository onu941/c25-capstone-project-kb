export interface image {
  filename: string;
}

export interface users {
  name: string;
  email: string;
  phone: string;
  password: string;
  image_id: number;
  is_admin: boolean;
}

export interface district {
  name: string;
}

export interface partyroom {
  name: string;
  host_id: number;
  district_id: number;
  capacity: number;
  phone: string;
  address: string;
  description: string;
  is_hidden: boolean;
}

export interface partyroomImage {
  partyroom_id: number;
  image_id: number;
}

export interface category {
  name: string;
}

export interface partyroomCategory {
  partyroom_id: number;
  category_id: number;
}

export interface equipment {
  name: string;
}

export interface partyroomEquipment {
  partyroom_id: number;
  equipment_id: number;
}

export interface partyroomPriceList {
  partyroom_id: number;
  headcount_price: number;
  is_holiday: boolean;
  start_time: string;
  total_hour: number;
  base_room_fee: number;
}

export interface bookingInfo {
  partyroom_price_list_id: number;
  booking_users_id: number;
  headcount: number;
  booking_date: string;
  start_time: string;
  total_hour: number;
  total_fee: number;
  special_request: string;
  is_hidden: boolean;
  status: string;
}

export interface review {
  booking_info_id: number;
  rating: number;
  detail: string;
  is_hidden: boolean;
}
