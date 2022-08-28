import { IsString, IsUUID } from 'class-validator';

export class NewTicketDto {
  @IsString()
  seatNo: string;

  @IsUUID()
  @IsString()
  flightId: string;
}
