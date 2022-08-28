import { Controller } from '@nestjs/common';
import { TicketCounterService } from './ticket-counter.service';

@Controller('ticket-counter')
export class TicketCounterController {
  constructor(private readonly ticketService: TicketCounterService) {}
}
