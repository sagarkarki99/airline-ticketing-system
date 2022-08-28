import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/entities/Ticket.entity';
import { TicketCounterController } from './ticket-counter.controller';
import { TicketCounterService } from './ticket-counter.service';

@Module({
  controllers: [TicketCounterController],
  providers: [TicketCounterService],
  imports: [TypeOrmModule.forFeature([Ticket])],
})
export class TicketCounterModule {}
