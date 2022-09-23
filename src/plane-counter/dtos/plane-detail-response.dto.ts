import { Expose } from 'class-transformer';
import { Airline } from 'src/entities/Airline.entity';

export class PlaneResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  airline: Airline;
}
