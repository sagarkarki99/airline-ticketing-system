import { Expose } from 'class-transformer';
import { Airline } from 'src/entities/Airline.entity';

export class PlaneResponseDto {
  id: string;

  @Expose()
  name: string;

  @Expose()
  totalSeats: number;

  @Expose()
  airline: Airline;
}
