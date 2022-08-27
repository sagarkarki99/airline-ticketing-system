import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewFlightDto } from './dtos/new-flight.dto';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('/')
  addNew(@Body() body: NewFlightDto) {
    return this.flightService.add(body.planeId, body.date);
  }

  @Get()
  getFlights(@Param('planeId') planeId?: string, @Param('date') date?: number) {
    return this.flightService.getFlights(planeId, date);
  }
}
