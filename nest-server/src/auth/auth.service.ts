import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.interface';
import { checkPassword } from 'src/user/hash';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const isPasswordMatch = await checkPassword(password, user.password);
    if (!isPasswordMatch) {
      throw new NotFoundException('Invalid credentials');
    }
    const { password: _, ...result } = user;
    // console.log('user:', user);
    // console.log('result:', result);
    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    // console.log('login fn user:', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      is_admin: user.is_admin,
      image_id: user.image_id,
    };
    // console.log(payload);
    return this.jwtService.signAsync(payload);
  }
}
