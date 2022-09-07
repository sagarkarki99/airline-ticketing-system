import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async getUser(email: string): Promise<User> {
    return this.repo.findOneBy({ email });
  }

  create(email: string, password: string, userType: string) {
    const role = this.getUserRole(userType);
    const user = this.repo.create({ email, password, role });
    return this.repo.save(user);
  }

  private getUserRole(type?: string): UserRole {
    if (type === 'admin') {
      return UserRole.admin;
    }
    return UserRole.normal;
  }
}
