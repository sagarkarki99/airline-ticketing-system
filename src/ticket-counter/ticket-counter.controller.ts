import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
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

  @Get('')
  getUserTicket() {
    return this.ticketService.getTickets();
  }

  @Delete('/:ticketNumber')
  cancelTicket(@Param('ticketNumber') ticketNo: string) {
    return this.ticketService.cancelTicketFor(parseInt(ticketNo));
  }
}
