import { IsInt, IsString } from 'class-validator';

export class NewAirlineDto {
  @IsString()
  name: string;
}

export class UpdateAirlineDto {
  name: string;
}
