import { UnprocessableEntityException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SeatType } from 'src/entities/Plane-seat.entity';

export class NewPlaneDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsUUID()
  @ApiProperty()
  airlineId: string;

  @IsNotEmpty({ message: 'Seats should not be empty.' })
  @ApiProperty({ isArray: true, type: () => SeatDto })
  seats: SeatDto[];
}

export class SeatDto {
  @IsString()
  @ApiProperty({
    type: String,
  })
  seatNo: string;

  @IsString()
  @ApiProperty({
    type: String,
    enum: SeatType,
  })
  type: SeatType;
}
