import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, User } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { User as _user, UserRole } from 'src/entities/User.entity';
import { NewTicketDto } from './dtos/new-ticket.dto';
import { TicketCounterService } from './ticket-counter.service';

@ApiBearerAuth('Authorization')
@Controller('ticket-counter')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Ticket-Resourses')
export class TicketCounterController {
  constructor(private readonly ticketService: TicketCounterService) {}

  @Post('/create')
  @Roles(UserRole.normal)
  createNewTicket(@Body() body: NewTicketDto, @User() user: _user) {
    return this.ticketService.create(`${user._id}`, body.flightId, body.seatNo);
  }

  @Get('')
  @Roles(UserRole.normal, UserRole.admin)
  getUserTickets(@User() user: _user) {
    return this.ticketService.getTickets(user);
  }

  @Delete('/:ticketNumber')
  @Roles(UserRole.normal)
  cancelTicket(@Param('ticketNumber') ticketNo: string) {
    return this.ticketService.cancelTicketFor(ticketNo);
  }
}
