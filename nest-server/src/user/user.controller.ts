import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
      // const { id } = await this.userService.createUser(CreateUserDto);
      // return { id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('/all')
  async getUserList() {
    const users = await this.userService.getUserList();
    return { users };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Request() req: Express.Request) {
    // console.log(req.user);
    const user = await this.userService.getUserById(req.user['id']);
    return { user };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUserInfo = await this.userService.updateUser(
      id,
      updateUserDto,
    );
    if (!updatedUserInfo) {
      throw new BadRequestException('No updated user info retrieved');
    }
    return updatedUserInfo;
  }
}
