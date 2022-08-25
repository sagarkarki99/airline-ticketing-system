import { IsInt, IsString } from 'class-validator';

export class NewAirlineDto {
  @IsString()
  name: string;

  @IsInt()
  totalAirplanes: number;
}

export class UpdateAirlineDto {
  name: string;
}
