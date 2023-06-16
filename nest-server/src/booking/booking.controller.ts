import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReviewDto } from './dto/create-review.dto';

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

  @Post(`/review/`)
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<{ message: string }> {
    await this.bookingService.createReview(createReviewDto);
    return { message: 'Review submitted!' };
  }
}
