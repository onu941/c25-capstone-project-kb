import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.interface';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { checkPassword, hashPassword } from './hash';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createUser(CreateUserDto: CreateUserDto) {
    try {
      const { name, email, phone, password, image_id, is_admin } =
        CreateUserDto;
      const hashedPassword = await hashPassword(password);
      const [id] = await this.knex('users')
        .insert({
          name,
          email,
          phone,
          password: hashedPassword,
          image_id,
          is_admin,
        })
        .returning(['id', 'name']);
      return { id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.knex
      .table('users')
      .where({ email })
      .first([
        'id',
        'name',
        'email',
        'phone',
        'password',
        'image_id',
        'is_admin',
      ]);
    if (!user) {
      return null;
    }
    const isPasswordMatch = await checkPassword(password, user.password);
    if (!isPasswordMatch) {
      return null;
    }
    const { password: _, ...result } = user;
    return result;
  }

  async getUserList() {
    const users = await this.knex
      .table('users')
      .select(
        'id',
        'name',
        'email',
        'phone',
        'password',
        'image_id',
        'is_admin',
      );
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }

  async getUserById(id: number) {
    const user = await this.knex
      .table('users')
      .where({ id })
      .first([
        'id',
        'name',
        'email',
        'phone',
        'password',
        'image_id',
        'is_admin',
      ]);
    if (!user) {
      throw new NotFoundException();
    }

    const { password: _, ...result } = user;
    return result;
  }

  async getUserByEmail(email: string) {
    const user = await this.knex
      .table('users')
      .where({ email })
      .first([
        'id',
        'name',
        'email',
        'phone',
        'password',
        'image_id',
        'is_admin',
      ]);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.getUserById(id);
    if ('name' in updateUserDto) {
      user.name = updateUserDto.name;
    }
    if ('phone' in updateUserDto) {
      user.phone = updateUserDto.phone;
    }
    if ('email' in updateUserDto) {
      user.email = updateUserDto.email;
    }

    const updatedUser = await this.knex('users').where({ id }).update({
      name: user.name,
      phone: user.phone,
      email: user.email,
    });

    if (!updatedUser) {
      return null;
    }

    const updatedUserInfo = await this.getUserById(id);
    return updatedUserInfo;
  }
}
