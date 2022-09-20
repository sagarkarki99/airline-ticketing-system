import { Expose } from 'class-transformer';
import { Plane } from 'src/entities/Plane.entity';

export class AirlineDetailDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  totalAirplanes: number;

  @Expose()
  planes: Plane[];
}
