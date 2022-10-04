import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/entities/User.entity';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @MinLength(7)
  @IsString()
  @ApiProperty({ type: String })
  password: string;

  @IsString()
  @ApiProperty({ enum: UserRole, type: () => String })
  userType: UserRole;
}
