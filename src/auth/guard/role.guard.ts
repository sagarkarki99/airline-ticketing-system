import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User, UserRole } from 'src/entities/User.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!roles) {
      return true;
    }
    return this.doesRoleMatches(user, roles);
  }
  doesRoleMatches(
    user: User,
    roles: UserRole[],
  ): boolean | Promise<boolean> | Observable<boolean> {
    return roles.includes(user.role);
  }
}
