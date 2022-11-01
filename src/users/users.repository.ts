import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from 'src/entities/User.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(
    email: string,
    password: string,
    userType: UserRole,
  ): Promise<User> {
    const createdUser = new this.userModel({ email, password, userType });
    return createdUser.save();
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
