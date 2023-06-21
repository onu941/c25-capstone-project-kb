import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateBookingRawDto {
  @IsString()
  partyroom_price_list_id: string;

  @IsString()
  booking_users_id: string;

  @IsString()
  headcount: string;

  @IsString()
  booking_date: string;

  @IsString()
  total_fee: string;

  @IsString()
  special_request: string;

  @IsString()
  is_hidden: string;

  @IsString()
  status: string;
}

export class CreateBookingDto {
  @IsInt()
  partyroom_price_list_id: number;

  @IsInt()
  booking_users_id: number;

  @IsInt()
  headcount: number;

  @IsString()
  booking_date: string;

  @IsInt()
  total_fee: number;

  @IsString()
  special_request: string;

  @IsBoolean()
  is_hidden: boolean;

  @IsString()
  status: string;
}
