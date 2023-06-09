import { IsBoolean, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsInt()
  phone: number;

  @IsString()
  @Length(8, 200)
  password: string;

  @IsInt()
  image_id: number;

  @IsBoolean()
  is_admin: boolean;
}
