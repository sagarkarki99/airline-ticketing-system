import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { User, UserRole } from 'src/entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(email: string, password: string) {
    const user = await this.usersService.getUser(email);
    if (!user) {
      this.throwIncorrectException();
    }
    const [_, salt] = user.password.split('.');
    const pass = await this.getEncryptedPassword(password, salt);
    if (user.password !== pass) {
      this.throwIncorrectException();
    }
    return this.generateAuthToken(user);
  }

  async registerNewUser(email: string, password: string, userType: UserRole) {
    const user = await this.usersService.getUser(email);
    if (user) {
      throw new BadRequestException('User already registered.');
    }

    const salt = randomBytes(8).toString('hex');
    const encryptedPassword = await this.getEncryptedPassword(password, salt);

    const newUser = await this.usersService.create(
      email,
      encryptedPassword,
      userType,
    );
    return this.generateAuthToken(newUser);
  }

  private generateAuthToken(user: User) {
    return this.jwtService.sign({
      email: user.email,
      id: user.id,
      role: user.role,
    });
  }

  private async getEncryptedPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    const value = (await scrypt(password, salt, 32)) as Buffer;
    return value.toString('hex') + '.' + salt;
  }

  private throwIncorrectException() {
    throw new BadRequestException(
      'Incorrect email or password',
      'INCORRECT_CREDENTIALS',
    );
  }
}
