import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { User as _user, UserRole } from 'src/entities/User.entity';
import { AuthConstants } from '../constants/auth_constants';

export const Roles = (...roles: UserRole[]) =>
  SetMetadata(AuthConstants.roles, roles);

export const User = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as _user;
  },
);
