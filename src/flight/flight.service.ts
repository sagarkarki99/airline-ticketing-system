import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Flight, FlightStatus } from 'src/entities/Flight.entity';
import { PlaneSeat } from 'src/entities/Plane-seat.entity';
import { Ticket } from 'src/entities/Ticket.entity';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { DataSource, Repository } from 'typeorm';
import { SeatResponseDto } from './dtos/seat-response.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Flight) private readonly repo: Repository<Flight>,
    private readonly planeService: PlaneCounterService,
  ) {}

  async add(planeId: string, date: number) {
    const d = new Date(date);
    console.log(`Creating date with ${d}`);

    const plane = await this.planeService.getPlaneById(planeId);
    if (!plane) {
      throw new BadRequestException('Plane not found with the given id');
    }
    const flight = await this.repo.create({
      planeId,
      departureDate: d.getTime(),
      status: FlightStatus.ready,
    });
    return this.repo.save(flight);
  }

  async getAvailableSeats(flightId: string, planeId: string) {
    const seats = await this.dataSource
      .getRepository(PlaneSeat)
      .findBy({ planeId });
    const tickets = await this.dataSource
      .getRepository(Ticket)
      .findBy({ flightId });

    const newSeats = seats.map((seat) => {
      const responseDto = new SeatResponseDto();
      responseDto.id = seat.id;
      responseDto.seatNo = seat.seatNo;
      responseDto.isBooked = tickets.some(
        (ticket) => ticket.flightId === flightId,
      );
      return responseDto;
    });

    return newSeats;
  }

  getFlights(planeId?: string, date?: number) {
    var dateTime: Date | undefined;

    if (date) {
      dateTime = new Date(date);
      console.log(`date is ${date} and Date: ${dateTime}`);
    }
    return this.repo.find({
      where: {
        planeId,
        departureDate: dateTime?.getTime(),
      },
    });
  }

  async getFlightById(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, body: UpdateFlightDto) {
    const flight = await this.repo.findOneBy({ id });
    if (!flight) {
      throw new NotFoundException('Flight not found!');
    }
    Object.assign(flight, { status: body.status });
    return this.repo.save(flight);
  }
}
