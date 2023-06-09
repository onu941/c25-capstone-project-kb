import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Post('/login')
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

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const token = await this.authService.updateUser(id, updateUserDto);
    if (!token) {
      throw new BadRequestException('No token found');
    }
    return { token };
  }
}
