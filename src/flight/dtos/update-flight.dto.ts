import { IsString } from 'class-validator';

export class UpdateFlightDto {
  @IsString()
  status: string;
}
