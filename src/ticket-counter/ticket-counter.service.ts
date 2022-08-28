import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket, TicketStatus } from 'src/entities/Ticket.entity';
import { FlightService } from 'src/flight/flight.service';
import { Repository } from 'typeorm';

@Injectable()
export class TicketCounterService {
  constructor(
    private readonly flightService: FlightService,
    @InjectRepository(Ticket) private readonly repo: Repository<Ticket>,
  ) {}

  async create(userId: string, flightId: string, seatNo: number) {
    console.log('Getting flight...');

    const flight = await this.getFlightFor(flightId);
    console.log('Flight found... Creating ticket now...');

    const ticket = this.repo.create({
      seatNo,
      userId,
      flightId: flight.id,
      createdOn: new Date().getDate(),
      status: TicketStatus.booked,
    });
    const value = await this.repo.save(ticket);
    console.log('Ticket saved successfully');
    return value;
  }

  private async getFlightFor(flightId: string) {
    const flight = await this.flightService.getFlightById(flightId);
    if (!flight) {
      throw new NotFoundException('Flight not found!');
    }
    return flight;
  }
}
