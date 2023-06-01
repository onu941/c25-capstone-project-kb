import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  users: User[];

  constructor() {
    this.users = [];
    this.users[1] = { id: 1, name: 'kevin' };
    this.users[2] = { id: 2, name: 'kk' };
  }

  async getUserList() {
    return this.users.filter((user) => user);
  }

  async getUserById(id: number) {
    const user = this.users[id];
    if (!user) {
      throw new NotFoundException();
    }
  }
}
