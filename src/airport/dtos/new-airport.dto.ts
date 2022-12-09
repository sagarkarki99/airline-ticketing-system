import { IsNotEmpty, IsString } from 'class-validator';

export class NewAirportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
