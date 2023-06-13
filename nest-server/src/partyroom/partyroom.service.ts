import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartyroomDto } from './dto/create-partyroom.dto';
import { UpdatePartyroomDto } from './dto/update-partyroom.dto';
import { Partyroom } from './entities/partyroom.entity';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';

@Injectable()
export class PartyroomService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  // async create(createPartyroomDto: CreatePartyroomDto) {
  //   let id =
  //     this.partyrooms.reduce((id, partyroom) => Math.max(id, partyroom.id), 0) +
  //     1;
  //   this.partyrooms[id] = {
  //     id,
  //     title: createPartyroomDto.title,
  //     price: createPartyroomDto.price,
  //   };
  //   return id;
  // }

  // async findAll() {
  //   return this.partyrooms.filter((partyroom) => partyroom);
  // }

  // async findOne(id: number) {
  //   let partyroom = this.partyrooms[id];
  //   if (!partyroom) {
  //     throw new NotFoundException('partyroom not found');
  //   }
  //   return partyroom;
  // }

  async findByUserIdforSettings(id: number) {
    if (!id) {
      throw new NotFoundException('No partyrooms found for the given user ID');
    }

    const userPartyrooms = await this.knex
      .table('partyroom')
      .select('id', 'name', 'address')
      .where('host_id', id)
      .orderBy('id', 'asc');
    return userPartyrooms;
  }

  // async update(id: number, updatePartyroomDto: UpdatePartyroomDto) {
  //   let partyroom = await this.findOne(id);
  //   if ('price' in updatePartyroomDto) {
  //     partyroom.price = updatePartyroomDto.price;
  //   }
  //   if ('title' in updatePartyroomDto) {
  //     partyroom.title = updatePartyroomDto.title;
  //   }
  //   return `updated`;
  // }

  // async remove(id: number) {
  //   delete this.partyrooms[id];
  //   return `deleted`;
  // }
}
