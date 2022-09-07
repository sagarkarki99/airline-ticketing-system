import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(@Body() body: LoginDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.registerNewUser(
      body.email,
      body.password,
      body.userType,
    );
  }
}
