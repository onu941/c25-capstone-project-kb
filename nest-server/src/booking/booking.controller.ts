import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

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
}
