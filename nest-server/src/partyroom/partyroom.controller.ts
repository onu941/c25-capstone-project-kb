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

  @Get('/district')
  async findAllDistricts() {
    return this.partyroomService.findAllDistricts();
  }

  @Get('/random')
  async findRandomForLanding() {
    return this.partyroomService.findRandomForLanding();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id in params');
    }

    const partyroom = await this.partyroomService.findOne(id);
    return partyroom[0];
  }

  @Get('/categories/:id')
  async findCategoriesForOne(@Param('id') id: number) {
    return this.partyroomService.findCategoriesForOne(id);
  }

  @Get('/equipment/:id')
  async findEquipmentForOne(@Param('id') id: number) {
    return this.partyroomService.findEquipmentForOne(id);
  }

  @Get('/images/:id')
  async findAllImagesForOne(@Param('id') id: number) {
    return this.partyroomService.findAllImagesForOne(id);
  }

  @Get('/reviews/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAllReviewsForOne(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id in params');
    }

    const reviews = await this.partyroomService.findAllReviewsForOne(id);
    return reviews;
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

  @Post('/search')
  async searchByDistrict(@Body('districtId') districtId: number) {
    return await this.partyroomService.searchByDistrict(districtId);
  }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string) {
  //     await this.partyroomService.remove(+id);
  //     return { message: `Partyroom with ID ${id} removed` };
  //   }

  //   @Patch(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body(new ValidationPipe()) updatePartyroomDto: UpdatePartyroomDto,
  //   ) {
  //     await this.partyroomService.update(+id, updatePartyroomDto);
  //     return { message: `Partyroom with ID ${id} updated` };
  //   }
}
