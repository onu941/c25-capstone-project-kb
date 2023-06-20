import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class SubmitRoomDto {
  @IsString()
  name: string;

  @IsInt()
  host_id: number;

  @IsInt()
  district: number;

  @IsInt()
  room_size: number;

  @IsInt()
  capacity: number;

  @IsInt()
  phone: number;

  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsString()
  filename: string;

  @IsInt()
  @Min(0)
  @Max(100_000)
  price: number;
}
