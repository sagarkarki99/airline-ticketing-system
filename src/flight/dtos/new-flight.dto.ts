import { IsNumber, IsString, IsUUID } from 'class-validator';

export class NewFlightDto {
  @IsNumber()
  date: Date;

  @IsString()
  @IsUUID()
  planeId: string;
}
