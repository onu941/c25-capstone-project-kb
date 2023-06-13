import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { PartyroomService } from './partyroom.service';
import { CreatePartyroomDto } from './dto/create-partyroom.dto';
import { UpdatePartyroomDto } from './dto/update-partyroom.dto';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('partyroom')
export class PartyroomController {
  constructor(
    private partyroomService: PartyroomService,
    private authService: AuthService,
  ) {}

  // @Post()
  // async create(
  //   @Body(new ValidationPipe()) createPartyroomDto: CreatePartyroomDto,
  // ) {
  //   return {
  //     id: await this.partyroomService.create(createPartyroomDto),
  //   };
  // }

  // @Get()
  // async findAll() {
  //   return { partyrooms: await this.partyroomService.findAll() };
  // }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id in params');
    }

    const partyroom = await this.partyroomService.findOne(id);
    return partyroom[0];
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard('jwt'))
  async findByUserIdforSettings(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id in params, expect integer');
    }

    const partyrooms = await this.partyroomService.findByUserIdforSettings(id);
    return partyrooms;
  }

  //   @Patch(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body(new ValidationPipe()) updatePartyroomDto: UpdatePartyroomDto,
  //   ) {
  //     await this.partyroomService.update(+id, updatePartyroomDto);
  //     return { message: `Partyroom with ID ${id} updated` };
  //   }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string) {
  //     await this.partyroomService.remove(+id);
  //     return { message: `Partyroom with ID ${id} removed` };
  //   }
}
