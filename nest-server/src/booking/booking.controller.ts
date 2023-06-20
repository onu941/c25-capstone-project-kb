import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
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

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  async findByUserIdForSettings(@Request() req: Express.Request) {
    return this.bookingService.findByUserIdForSettings(req.user['id']);
  }

  @Get('/settings_host')
  @UseGuards(AuthGuard('jwt'))
  async findByHostIdForSettings(@Request() req: Express.Request) {
    return this.bookingService.findByHostIdForSettings(req.user['id']);
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

  @Get(`/next/partygoer`)
  @UseGuards(AuthGuard('jwt'))
  async findNextBookingAsPartygoer(@Request() req: Express.Request) {
    return this.bookingService.findNextBookingAsPartygoer(req.user['id']);
  }

  @Get(`/next/host`)
  @UseGuards(AuthGuard('jwt'))
  async findNextBookingAsHost(@Request() req: Express.Request) {
    return this.bookingService.findNextBookingAsHost(req.user['id']);
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
