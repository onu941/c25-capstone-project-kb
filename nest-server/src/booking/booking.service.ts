import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class BookingService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findByUserIdForSettings(id: number) {
    if (!id) {
      throw new NotFoundException('No bookings found for the given user ID');
    }

    // fix this knex query
    const userBookings = await this.knex
      .table('booking_info')
      .where('booking_users_id', id);

    return userBookings;
  }
}
