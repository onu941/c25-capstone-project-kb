import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  async getUserList() {
    const users = await this.userService.getUserList();
    return { users };
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id in params, expect integer');
    }
    const user = await this.userService.getUserById(id);
    return { user };
  }
}
