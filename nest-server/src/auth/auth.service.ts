import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.interface";
import { checkPassword } from "src/user/hash";
import { LoginDto } from "src/user/dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException("Invalid credentials");
    }
    const isPasswordMatch = await checkPassword(password, user.password);
    if (!isPasswordMatch) {
      throw new NotFoundException("Invalid credentials");
    }
    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = {
      id: user.id,
    };

    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
