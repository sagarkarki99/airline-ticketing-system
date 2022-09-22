import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { TokenResponseDto } from './dtos/token-response.dto';

@Controller('auth')
@ApiTags('Auth-Resources')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @Serialize(TokenResponseDto)
  async signin(@Body() body: LoginDto) {
    const token = await this.authService.signin(body.email, body.password);
    return { accessToken: token };
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
