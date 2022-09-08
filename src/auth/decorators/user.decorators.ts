import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { User as _user, UserRole } from 'src/entities/User.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

export const User = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as _user;
  },
);
