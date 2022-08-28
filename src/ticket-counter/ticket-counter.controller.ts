import { Body, Controller, Post } from '@nestjs/common';
import { NewTicketDto } from './dtos/new-ticket.dto';
import { TicketCounterService } from './ticket-counter.service';

@Controller('ticket-counter')
export class TicketCounterController {
  constructor(private readonly ticketService: TicketCounterService) {}

  @Post('/create')
  createNewTicket(@Body() body: NewTicketDto) {
    return this.ticketService.create(
      'UserId',
      body.flightId,
      parseInt(body.seatNo),
    );
  }
}
