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
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body(new ValidationPipe()) CreateUserDto: CreateUserDto) {
    try {
      const { id } = await this.userService.createUser(CreateUserDto);
      return { id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
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
