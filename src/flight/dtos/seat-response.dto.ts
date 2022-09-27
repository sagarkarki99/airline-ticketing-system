import { Expose } from 'class-transformer';

export class SeatResponseDto {
  @Expose()
  id: string;

  @Expose()
  seatNo: string;

  @Expose()
  isBooked: boolean;
}
