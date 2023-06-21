import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateReviewDto } from 'src/booking/dto/create-review.dto';
import { UpdateBookingStatusDto } from './dto/update-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

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
      .where('booking_users_id', id)
      .orderBy('booking_info.booking_date', 'asc');

    return userBookings;
  }

  async findByHostIdForSettings(id: number) {
    if (!id) {
      throw new NotFoundException(
        'Check ID. No bookings as host found for the given user ID',
      );
    }

    const hostBookings = await this.knex
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
      .where('partyroom.host_id', id)
      .orderBy('booking_info.booking_date', 'asc');

    return hostBookings;
  }

  async findOneAsHost(id: number) {
    try {
      const query = await this.knex
        .select(
          'booking_info.id',
          'booking_info.booking_users_id AS person_id',
          'booking_info.headcount',
          'booking_info.booking_date',
          'booking_info.special_request',
          'booking_info.status',
          'partyroom_price_list.start_time',
          'partyroom.id AS partyroom_id',
          'partyroom.name',
          'partyroom.address',
          'users.name AS person_name',
          'users.phone',
          'image.filename',
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
        .join('users', 'booking_info.booking_users_id', '=', 'users.id')
        .join(
          'partyroom_image',
          'partyroom.id',
          '=',
          'partyroom_image.partyroom_id',
        )
        .join('image', 'partyroom_image.image_id', 'image.id')
        .where('booking_info.id', id);

      return query;
    } catch (error) {
      console.log(error);
    }
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
          'partyroom.host_id AS person_id',
          'partyroom.phone',
          'partyroom.address',
          'users.name AS person_name',
          'image.filename',
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
        .join(
          'partyroom_image',
          'partyroom.id',
          '=',
          'partyroom_image.partyroom_id',
        )
        .join('image', 'partyroom_image.image_id', 'image.id')
        .where('booking_info.id', id);

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async findNextBookingAsPartygoer(id: number) {
    try {
      const query = await this.knex
        .select(
          'booking_info.id',
          'booking_info.booking_users_id AS person_id',
          'booking_info.headcount',
          'booking_info.booking_date',
          'partyroom_price_list.start_time',
          'partyroom.name',
          'partyroom.address',
          'image.filename AS image_filename',
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
        .join(
          'partyroom_image',
          'partyroom.id',
          '=',
          'partyroom_image.partyroom_id',
        )
        .join('image', 'partyroom_image.image_id', '=', 'image.id')
        .where(
          'booking_info.booking_date',
          '>=',
          this.knex.raw('CAST(? as DATE)', [this.knex.fn.now()]),
        )
        .andWhere('booking_info.booking_users_id', '=', id)
        .orderBy('booking_date')
        .first();

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async findNextBookingAsHost(id: number) {
    try {
      const query = await this.knex
        .select(
          'booking_info.id',
          'booking_info.headcount',
          'booking_info.booking_date',
          'partyroom_price_list.start_time',
          'partyroom.name',
          'partyroom.address',
          'partyroom.host_id AS person_id',
          'image.filename AS image_filename',
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
        .join(
          'partyroom_image',
          'partyroom.id',
          '=',
          'partyroom_image.partyroom_id',
        )
        .join('image', 'partyroom_image.image_id', '=', 'image.id')
        .where(
          'booking_info.booking_date',
          '>=',
          this.knex.raw('CAST(? as DATE)', [this.knex.fn.now()]),
        )
        .andWhere('partyroom.host_id', id)
        .orderBy('booking_date')
        .first();

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async createBooking(formData: CreateBookingDto) {
    try {
      const query = await this.knex('booking_info')
        .insert({
          partyroom_price_list_id: formData.partyroom_price_list_id,
          booking_users_id: formData.booking_users_id,
          headcount: formData.headcount,
          booking_date: formData.booking_date,
          total_fee: formData.total_fee,
          special_request: formData.special_request,
          is_hidden: formData.is_hidden,
          status: formData.status,
        })
        .returning('id');

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBookingStatus(
    id: number,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    try {
      const updatedStatus = await this.knex('booking_info')
        .where('booking_info.id', id)
        .update({ status: updateBookingStatusDto.status });

      if (!updatedStatus) {
        return null;
      }

      return { message: 'Booking status updated' };
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
