import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("auth/login")
  async login(@Request() req): Promise<any> {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw new HttpException(
        "imvalid email or password",
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
