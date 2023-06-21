import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { PartyroomService } from './partyroom.service';
import { CreatePartyroomDto } from './dto/create-partyroom.dto';
import { UpdatePartyroomDto } from './dto/update-partyroom.dto';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { readdirSync } from 'fs';
import path from 'path';

@Controller('partyroom')
export class PartyroomController {
  constructor(
    private partyroomService: PartyroomService,
    private authService: AuthService,
  ) {}

  @Get('/district')
  async findAllDistricts() {
    return this.partyroomService.findAllDistricts();
  }

  @Get('/random')
  @UseGuards(AuthGuard('jwt'))
  async findRandomForLanding(@Request() req: Express.Request) {
    return this.partyroomService.findRandomForLanding(req.user['id']);
  }

  @Get('/categories/:id')
  async findCategoriesForOne(@Param('id') id: number) {
    return this.partyroomService.findCategoriesForOne(id);
  }

  @Get('/equipment/:id')
  async findEquipmentForOne(@Param('id') id: number) {
    return this.partyroomService.findEquipmentForOne(id);
  }

  @Get('/pricelist/:id')
  async findPriceListsForOne(@Param('id') id: number) {
    return await this.partyroomService.findPriceListsForOne(id);
  }

  @Get('/img/:id')
  async findImagesOnNest(@Param('id') id: number) {
    const serveQuery = await this.partyroomService.findImagesOnNest(id);

    const imageUrls = serveQuery.map((filename) => {
      return filename;
    });

    return imageUrls;
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

  // issue
  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  async findByUserIdforSettings(@Request() req: Express.Request) {
    console.log(req.user);
    return this.partyroomService.findByUserIdforSettings(req.user['id']);
  }

  @Post('/search')
  async searchByDistrict(@Body('districtId') districtId: number) {
    return await this.partyroomService.searchByDistrict(districtId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id in params');
    }

    const partyroom = await this.partyroomService.findOne(id);
    return partyroom[0];
  }
}
