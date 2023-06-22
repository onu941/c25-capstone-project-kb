import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  booking_info_id: number;

  @IsInt()
  @Min(0)
  @Max(11)
  rating: number;

  @IsString()
  detail: string;

  @IsBoolean()
  is_hidden: boolean;
}
