import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FlightResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  plane: string;

  @Expose()
  @ApiProperty({ type: String })
  departureDate: Date;

  @Expose()
  @ApiProperty({ type: String })
  status: string;

  @Expose()
  @ApiProperty({ type: String })
  from: string;

  @Expose()
  @ApiProperty({ type: String })
  to: string;
}
