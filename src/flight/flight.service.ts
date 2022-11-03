import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { TicketCounterService } from 'src/ticket-counter/ticket-counter.service';
import { SeatResponseDto } from './dtos/seat-response.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { FlightRepository } from './flight.repository';

@Injectable()
export class FlightService {
  constructor(
    private readonly repo: FlightRepository,
    private readonly planeService: PlaneCounterService,
    @Inject(forwardRef(() => TicketCounterService))
    private readonly ticketService: TicketCounterService,
  ) {}

  async add(planeId: string, date: number) {
    const d = new Date(date);
    console.log(`Creating date with ${d}`);

    const plane = await this.planeService.getPlaneById(planeId);
    if (!plane) {
      throw new BadRequestException('Plane not found with the given id');
    }
    const flight = await this.repo.add(planeId, d);
    return this.repo.save(flight);
  }

  async getSeats(flightId: string, planeId: string) {
    const tickets = await this.ticketService.getTicketFor(flightId);

    // const seats = await this.dataSource
    //   .getRepository(PlaneSeat)
    //   .findBy({ plane: planeId });
    //TODO: create a seperate module for seats and get it from there.
    const seats = [];

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
      Logger.log(`date is ${date} and Date: ${dateTime}`);
    }
    return this.repo.find({
      where: {
        planeId,
        departureDate: dateTime,
      },
    });
  }

  async getFlightById(id: string) {
    return this.repo.findById(id);
  }

  async update(id: string, body: UpdateFlightDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('INVALID_ID', 'id is invalid');
    }

    const flight = await this.repo.findOneBy({ id });
    if (!flight) {
      throw new NotFoundException('Flight not found!');
    }
    Object.assign(flight, { status: body.status });
    return this.repo.update(id, flight);
  }
}
