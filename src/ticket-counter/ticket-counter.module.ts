import { Module } from '@nestjs/common';
import { TicketCounterController } from './ticket-counter.controller';
import { TicketCounterService } from './ticket-counter.service';

@Module({
  controllers: [TicketCounterController],
  providers: [TicketCounterService]
})
export class TicketCounterModule {}
