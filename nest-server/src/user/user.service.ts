import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.interface';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';

@Injectable()
export class UserService {
  users: User[];
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getUserList() {
    const users = await this.knex.table('users').select('*');
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }

  async getUserById(id: number) {
    const user = await this.knex.table('users').where({ id }).first();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
