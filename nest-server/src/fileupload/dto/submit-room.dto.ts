import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

// ***************** //
// don't use IsInt() //
// ***************** //

export class SubmitRawRoomDto {
  @IsString()
  name: string;

  @IsString()
  host_id: string;

  @IsString()
  address: string;

  @IsString()
  capacity: string;

  @IsString()
  district: string;

  @IsString()
  room_size: string;

  @IsString()
  phone: string;

  @IsString()
  description: string;

  @IsString()
  is_hidden: string;

  @IsString()
  category_id: string;

  @IsString()
  equipment_id: string;

  @IsString()
  price_list: string;

  @IsOptional()
  @IsString()
  images: string;
}

export class SubmitRoomDto {
  @IsString()
  name: string;

  @IsInt()
  host_id: number;

  @IsString()
  address: string;

  @IsInt()
  capacity: number;

  @IsInt()
  district_id: number;

  @IsInt()
  room_size: number;

  @IsInt()
  phone: number;

  @IsString()
  description: string;

  @IsBoolean()
  is_hidden: boolean;

  @IsArray()
  category_id: [];

  @IsArray()
  equipment_id: [];

  @IsArray()
  price_list: PriceList[];

  @IsOptional()
  @IsArray()
  images: string[];
}

export interface PriceList {
  base_room_fee: number;
  headcount_price: number;
  start_time: string;
  total_hour: number;
  is_holiday: boolean;
}
