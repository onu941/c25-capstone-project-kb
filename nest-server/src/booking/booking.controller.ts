import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateBookingStatusDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
  ) {}

  @Get('/user/:id')
  @UseGuards(AuthGuard('jwt'))
  async findByUserIdForSettings(@Param('id') id: number) {
    return this.bookingService.findByUserIdForSettings(id);
  }

  @Get('/settings_host/:id')
  @UseGuards(AuthGuard('jwt'))
  async findByHostIdForSettings(@Param('id') id: number) {
    return this.bookingService.findByHostIdForSettings(id);
  }

  @Get(`/host/:id`)
  @UseGuards(AuthGuard('jwt'))
  async findOneAsHost(@Param('id') id: number) {
    return this.bookingService.findOneAsHost(id);
  }

  @Get(`/partygoer/:id`)
  @UseGuards(AuthGuard('jwt'))
  async findOneAsPartygoer(@Param('id') id: number) {
    return this.bookingService.findOneAsPartygoer(id);
  }

  @Get(`/next/partygoer/:id`)
  @UseGuards(AuthGuard('jwt'))
  async findNextBookingAsPartygoer(@Param('id') id: number) {
    return this.bookingService.findNextBookingAsPartygoer(id);
  }

  @Get(`/next/host/:id`)
  @UseGuards(AuthGuard('jwt'))
  async findNextBookingAsHost(@Param('id') id: number) {
    return this.bookingService.findNextBookingAsHost(id);
  }

  @Patch(`/update_status/:id`)
  @UseGuards(AuthGuard('jwt'))
  async updateBookingStatus(
    @Param('id') id: number,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateBookingStatus(id, updateBookingStatusDto);
  }

  @Post(`/review/`)
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<{ message: string }> {
    await this.bookingService.createReview(createReviewDto);
    return { message: 'Review submitted!' };
  }
}
