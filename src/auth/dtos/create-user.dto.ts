import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/entities/User.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(7)
  @IsString()
  password: string;

  @IsString()
  userType: UserRole;
}
