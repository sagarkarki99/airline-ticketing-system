import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  async getUser(email: string): Promise<User> {
    const user = await this.repo.findOneByEmail(email);
    return user;
  }

  create(email: string, password: string, userType: string) {
    const role = this.getUserRole(userType);
    return this.repo.create(email, password, role);
  }

  private getUserRole(type?: string): UserRole {
    if (type === 'admin') {
      return UserRole.admin;
    }
    return UserRole.normal;
  }
}
