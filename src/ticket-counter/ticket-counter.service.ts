import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight, FlightDocument } from 'src/entities/Flight.entity';
import { Ticket, TicketStatus } from 'src/entities/Ticket.entity';
import { User, UserRole } from 'src/entities/User.entity';
import { FlightService } from 'src/flight/flight.service';
import { Repository } from 'typeorm';
import { TicketCounterRepository } from './ticket-counter.repository';

@Injectable()
export class TicketCounterService {
  constructor(
    @Inject(forwardRef(() => FlightService))
    private readonly flightService: FlightService,
    private readonly repo: TicketCounterRepository,
  ) {}

  getTickets(user: User) {
    if (user.role === UserRole.admin) {
      return this.repo.find();
    }
    return this.repo.findByUser(user._id);
  }

  async getTicketFor(flightId: string) {
    return this.repo.fingByFlight(flightId);
  }

  async create(userId: string, flightId: string, seatId: string) {
    const flight = await this.getFlightFor(flightId);
    console.log('Flight found... Creating ticket now...');

    if (await this.isTicketAlreadyBooked(seatId, flightId)) {
      throw new UnprocessableEntityException(
        'Seat is not available.',
        'NOT_AVAILABLE',
      );
    }

    const value = await this.repo.saveTicket(seatId, userId, flight);
    console.log('Ticket saved successfully');
    return value;
  }

  async cancelTicketFor(ticketId: string) {
    const ticket = await this.repo.findById(ticketId);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    Object.assign(ticket, {
      status: TicketStatus.cancelled,
    });

    return this.repo.update(ticketId, ticket);
  }

  async isTicketAlreadyBooked(
    seatId: string,
    flightId: string,
  ): Promise<boolean> {
    console.log('Validating seat no...');
    const ticket = await this.repo.findOneBy({ seatId, flightId });
    if (ticket) {
      return true;
    }
    return false;
  }

  private async getFlightFor(flightId: string) {
    console.log('Getting flight...');
    const flight = await this.flightService.getFlightById(flightId);
    if (!flight) {
      console.log('flight not found.');
      throw new NotFoundException('Flight not found!');
    }
    return flight;
  }
}
