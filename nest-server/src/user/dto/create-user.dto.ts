import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @Length(8, 200)
  password: string;

  @IsOptional()
  @IsInt()
  image_id: number;

  @IsOptional()
  @IsBoolean()
  is_admin: boolean;
}
