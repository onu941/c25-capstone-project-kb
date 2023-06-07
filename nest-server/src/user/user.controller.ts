import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from 'src/partyroom/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body(new ValidationPipe()) CreateUserDto: CreateUserDto) {
    try {
      console.log('userController CreateUserDto:', CreateUserDto);
      const { id } = await this.userService.createUser(CreateUserDto);
      console.log('userId:', id);
      return { id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

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
