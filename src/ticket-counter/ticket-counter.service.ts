import { Injectable } from '@nestjs/common';
import { Ticket } from 'src/entities/Ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketCounterService {
  constructor(private readonly repo: Repository<Ticket>) {}
}
