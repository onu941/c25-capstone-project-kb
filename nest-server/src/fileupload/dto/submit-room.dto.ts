import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class SubmitRoomDto {
  @IsString()
  @Length(5, 20)
  title: string;

  @IsString()
  filename: string;

  @IsInt()
  @Min(0)
  @Max(100_000)
  price: number;
}
