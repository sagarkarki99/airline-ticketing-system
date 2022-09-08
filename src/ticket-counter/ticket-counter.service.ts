import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/entities/Flight.entity';
import { Ticket, TicketStatus } from 'src/entities/Ticket.entity';
import { FlightService } from 'src/flight/flight.service';
import { Repository } from 'typeorm';

@Injectable()
export class TicketCounterService {
  constructor(
    private readonly flightService: FlightService,
    @InjectRepository(Ticket) private readonly repo: Repository<Ticket>,
  ) {}
  getTickets() {
    return this.repo.find();
  }

  async create(userId: string, flightId: string, seatNo: number) {
    const flight = await this.getFlightFor(flightId);
    console.log('Flight found... Creating ticket now...');

    if (await this.isTicketAlreadyBooked(seatNo, flightId)) {
      throw new UnprocessableEntityException(
        'Seat is not available.',
        'NOT_AVAILABLE',
      );
    }

    const value = await this.saveTicket(seatNo, userId, flight);
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
    seatNo: number,
    flightId: string,
  ): Promise<boolean> {
    console.log('Validating seat no...');
    const ticket = await this.repo.findOneBy({ seatNo, flightId });
    if (ticket) {
      return true;
    }
    return false;
  }

  private async saveTicket(seatNo: number, userId: string, flight: Flight) {
    const ticket = this.repo.create({
      seatNo,
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
