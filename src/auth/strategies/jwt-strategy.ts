import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: UserTokenPayload) {
    const user = await this.usersService.getUser(payload.email);
    if (!user) {
      throw new UnauthorizedException('Token is invalid');
    }
    return user;
  }
}

export type UserTokenPayload = {
  email: string;
  id: string;
};
