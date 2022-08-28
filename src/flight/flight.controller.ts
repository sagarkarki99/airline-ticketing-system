import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NewFlightDto } from './dtos/new-flight.dto';
import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('/')
  async addNew(@Body() body: NewFlightDto) {
    return this.flightService.add(body.planeId, body.date);
  }

  @Get('/')
  getFlights(@Query('planeId') planeId: string, @Query('date') date: string) {
    console.log(`PlaneId: ${planeId}, date: ${date}`);
    return this.flightService.getFlights(planeId, parseInt(date));
  }
}
