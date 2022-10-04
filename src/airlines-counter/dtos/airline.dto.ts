import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class NewAirlineDto {
  @IsString()
  @ApiProperty({ type: String })
  name: string;
}

export class UpdateAirlineDto {
  @ApiProperty({ type: String })
  name: string;
}
