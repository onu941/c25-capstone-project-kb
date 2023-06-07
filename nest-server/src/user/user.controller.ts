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

  @Post('/signup')
  async createUser(@Body(new ValidationPipe()) CreateUserDto: CreateUserDto) {
    try {
      const { id } = await this.userService.createUser(CreateUserDto);
      return { id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = await this.authService.generateToken(user);
    return { token };
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
