import { IsNumber, IsString, IsUUID } from 'class-validator';

export class NewFlightDto {
  @IsNumber()
  date: number;

  @IsString()
  @IsUUID()
  planeId: string;
}
