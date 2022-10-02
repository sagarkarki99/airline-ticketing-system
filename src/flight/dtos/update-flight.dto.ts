import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { FlightStatus } from 'src/entities/Flight.entity';

export class UpdateFlightDto {
  @IsString()
  @ApiProperty({ enum: FlightStatus, type: () => String })
  status: string;
}
