import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateReviewDto } from 'src/booking/dto/create-review.dto';

@Injectable()
export class BookingService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findByUserIdForSettings(id: number) {
    if (!id) {
      throw new NotFoundException('No bookings found for the given user ID');
    }

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

  async findOneAsPartygoer(id: number) {
    try {
      const query = await this.knex
        .select(
          'booking_info.id',
          'booking_info.headcount',
          'booking_info.booking_date',
          'booking_info.special_request',
          'booking_info.status',
          'partyroom_price_list.start_time',
          'partyroom.id AS partyroom_id',
          'partyroom.name',
          'partyroom.host_id',
          'partyroom.phone',
          'partyroom.address',
          'users.name AS host_name',
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
        .join('users', 'partyroom.host_id', '=', 'users.id')
        .where('booking_info.id', id);

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async createReview(createReviewDto: CreateReviewDto): Promise<void> {
    if (!createReviewDto) {
      throw new BadRequestException('createReviewDto not working');
    }

    await this.knex('review').insert({
      booking_info_id: createReviewDto.booking_info_id,
      rating: createReviewDto.rating,
      detail: createReviewDto.detail,
      is_hidden: createReviewDto.is_hidden,
    });
  }
}
