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
      .select(
        'booking_info.id',
        'booking_info.headcount',
        'booking_info.booking_date',
        'partyroom.name',
        'partyroom.address',
        'partyroom_price_list.start_time',
      )
      .from('booking_info')
      .join(
        'partyroom_price_list',
        'booking_info.partyroom_price_list_id',
        '=',
        'partyroom_price_list.id',
      )
      .join(
        'partyroom',
        'partyroom_price_list.partyroom_id',
        '=',
        'partyroom.id',
      )
      .where('booking_users_id', id);

    return userBookings;
  }
}
