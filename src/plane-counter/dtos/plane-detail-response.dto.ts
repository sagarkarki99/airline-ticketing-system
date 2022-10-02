import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Airline } from 'src/entities/Airline.entity';

export class PlaneResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;

  @Expose()
  @ApiProperty({ type: () => Airline })
  airline: Airline;
}
