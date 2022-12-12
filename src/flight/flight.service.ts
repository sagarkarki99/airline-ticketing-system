import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { PlaneSeatService } from 'src/plane-seat/plane-seat.service';
import { TicketCounterService } from 'src/ticket-counter/ticket-counter.service';
import { NewFlightDto } from './dtos/new-flight.dto';
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
    private readonly planeSeatService: PlaneSeatService,
  ) {}

  async add(newFlightDto: NewFlightDto) {
    const { planeId, date } = newFlightDto;

    const plane = await this.planeService.getPlaneById(planeId);
    if (!plane) {
      throw new BadRequestException('Plane not found with the given id');
    }
    const flight = await this.repo.add(newFlightDto);
    return this.repo.save(flight);
  }

  async getSeats(flightId: string, planeId: string) {
    try {
      const tickets = await this.ticketService.getTicketFor(flightId);

      const seats = await this.planeSeatService.getSeats(planeId);

      const newSeats = seats.map((seat) => {
        const responseDto = new SeatResponseDto();
        responseDto.id = seat.id;
        responseDto.seatNo = seat.seatNo;
        responseDto.isBooked = tickets.some(
          (ticket) => seat.seatNo === ticket.seatId,
        );
        return responseDto;
      });
      return newSeats;
    } catch (error) {
      throw new InternalServerErrorException('Cannot fetch available seats.');
    }
  }

  getFlights(planeId?: string, date?: number) {
    var dateTime: Date | undefined;

    return this.repo.getAllFlightsFor(planeId, date);
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
