import { IsNumber, IsString, IsUUID } from 'class-validator';

export class NewPlaneDto {
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  airlineId: string;
}
