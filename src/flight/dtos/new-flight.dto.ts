import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class NewFlightDto {
  @IsNumber()
  @ApiProperty({ type: Number })
  date: number;

  @IsString()
  @ApiProperty({ type: String })
  planeId: string;
}
