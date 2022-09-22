import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { User } from 'src/entities/User.entity';
import { NewFlightDto } from './dtos/new-flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { FlightService } from './flight.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('flights')
@ApiTags('flights-resources')
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

  @Patch('/:id')
  updateFlight(
    @Body() body: UpdateFlightDto,
    @Param('id') id: string,
    @Admin() admin: User,
  ) {
    return this.flightService.update(id, body);
  }
}
