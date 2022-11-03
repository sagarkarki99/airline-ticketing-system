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

@Injectable()
export class TicketCounterService {
  constructor(
    @Inject(forwardRef(() => FlightService))
    private readonly flightService: FlightService,
    @InjectRepository(Ticket) private readonly repo: Repository<Ticket>,
  ) {}

  getTickets(user: User) {
    if (user.role === UserRole.admin) {
      return this.repo.find();
    }
    return this.repo.findBy({ userId: `${user._id}` });
  }

  async getTicketFor(flightId: string) {
    return this.repo.findBy({ flightId: flightId });
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

    const value = await this.saveTicket(seatId, userId, flight);
    console.log('Ticket saved successfully');
    return value;
  }

  async cancelTicketFor(ticketNo: number) {
    const ticket = await this.repo.findOneBy({ ticketNo });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    Object.assign(ticket, {
      status: TicketStatus.cancelled,
    });

    return this.repo.save(ticket);
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

  private async saveTicket(
    seatId: string,
    userId: string,
    flight: FlightDocument,
  ) {
    const ticket = this.repo.create({
      seatId,
      userId,
      flightId: flight.id,
      createdOn: new Date().getDate(),
      status: TicketStatus.booked,
    });
    const value = await this.repo.save(ticket);
    return value;
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
