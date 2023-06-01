import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  async getUserList() {
    return { users: await this.userService.getUserList() };
  }

  @Get(':id')
  async getUserById(@Param('id') idStr: string) {
    const id = +idStr;
    if (!id) {
      throw new BadRequestException('invalid id in params, expect integer');
    }
    return {
      user: await this.userService.getUserById(id),
    };
  }
}
