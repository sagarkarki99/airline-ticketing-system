import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class NewTicketDto {
  @IsString()
  @ApiProperty({ type: String })
  seatNo: string;

  @IsUUID()
  @IsString()
  @ApiProperty({ type: String })
  flightId: string;
}
