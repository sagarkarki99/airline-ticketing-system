import { UnprocessableEntityException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { SeatType } from 'src/entities/Plane-seat.entity';

export class NewPlaneDto {
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  airlineId: string;

  @IsNotEmpty({ message: 'Seats should not be empty.' })
  seats: SeatDto[];
}

export default class SeatDto {
  @IsString()
  seatNo: string;

  @IsString()
  // @Transform((params) => getSeatType(params.value))
  type: SeatType;
}

function getSeatType(type: string): SeatType {
  if (type === 'business') {
    return SeatType.business;
  } else if (type === 'economy') {
    return SeatType.economy;
  } else if (type === 'firstclass') {
    return SeatType.firstclass;
  } else {
    throw new UnprocessableEntityException('SeatType is not a valid type.');
  }
}
