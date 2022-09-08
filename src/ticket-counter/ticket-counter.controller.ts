import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles, User } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { User as _user, UserRole } from 'src/entities/User.entity';
import { NewTicketDto } from './dtos/new-ticket.dto';
import { TicketCounterService } from './ticket-counter.service';

@Controller('ticket-counter')
@UseGuards(JwtAuthGuard, RoleGuard)
export class TicketCounterController {
  constructor(private readonly ticketService: TicketCounterService) {}

  @Post('/create')
  @Roles(UserRole.normal)
  createNewTicket(@Body() body: NewTicketDto) {
    return this.ticketService.create(
      'UserId',
      body.flightId,
      parseInt(body.seatNo),
    );
  }

  @Get('')
  @Roles(UserRole.normal, UserRole.admin)
  getUserTicket(@User() user: _user) {
    console.log(`${user}`);

    return this.ticketService.getTickets();
  }

  @Delete('/:ticketNumber')
  @Roles(UserRole.normal)
  cancelTicket(@Param('ticketNumber') ticketNo: string) {
    return this.ticketService.cancelTicketFor(parseInt(ticketNo));
  }
}
