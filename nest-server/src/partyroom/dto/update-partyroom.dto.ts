import { PartialType } from '@nestjs/mapped-types';
import { CreatePartyroomDto } from './create-partyroom.dto';
import { IsString, Length, IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdatePartyroomDto extends PartialType(CreatePartyroomDto) {
  @IsOptional()
  @IsString()
  @Length(5, 20)
  title: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100_000)
  price: number;
}
