import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class NewFlightDto {
  @IsNumber()
  @ApiProperty({ type: Number })
  date: number;

  @IsString()
  @ApiProperty({ type: String })
  planeId: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  fullDate() {
    return new Date(this.date);
  }
}
