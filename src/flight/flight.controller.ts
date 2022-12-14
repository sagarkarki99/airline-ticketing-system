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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { User } from 'src/entities/User.entity';
import { FlightResponseDto } from './dtos/flight.response.dto';
import { NewFlightDto } from './dtos/new-flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { FlightService } from './flight.service';

@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('flights')
@ApiTags('Flights-Resources')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('/')
  async addNew(@Body() body: NewFlightDto): Promise<FlightResponseDto> {
    const flight = await this.flightService.add(body);
    console.log(flight);

    return {
      id: flight.id,
      departureDate: flight.departureDate,
      plane: body.planeId,
      status: flight.status,
      from: flight.from,
      to: flight.to,
    };
  }

  @Get('/')
  @ApiQuery({ required: false, name: 'date', type: Number })
  @ApiQuery({ required: false, name: 'planeId', type: String })
  async getFlights(
    @Query('planeId') planeId?: string,
    @Query('date') date?: string,
  ) {
    return this.flightService.getFlights(planeId, parseInt(date));
  }

  @ApiBearerAuth('Authorization')
  @Get('/seats')
  getFlightSeats(
    @Query('flightId') flightId: string,
    @Query('planeId') planeId: string,
  ) {
    return this.flightService.getSeats(flightId, planeId);
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
