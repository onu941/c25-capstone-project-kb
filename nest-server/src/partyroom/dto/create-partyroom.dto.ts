import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreatePartyroomDto {
  @IsString()
  @Length(5, 20)
  title: string;

  @IsInt()
  @Min(0)
  @Max(100_000)
  price: number;
}
