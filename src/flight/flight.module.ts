import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirlinesCounterModule } from 'src/airlines-counter/airlines-counter.module';
import { Flight, FlightSchema } from 'src/entities/Flight.entity';
import { Ticket } from 'src/entities/Ticket.entity';
import { PlaneCounterModule } from 'src/plane-counter/plane-counter.module';
import { PlaneSeatModule } from 'src/plane-seat/plane-seat.module';
import { PlaneSeatService } from 'src/plane-seat/plane-seat.service';
import { TicketCounterModule } from 'src/ticket-counter/ticket-counter.module';
import { FlightController } from './flight.controller';
import { FlightRepository } from './flight.repository';
import { FlightService } from './flight.service';

@Module({
  controllers: [FlightController],
  providers: [FlightService, FlightRepository, PlaneSeatService],
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    PlaneCounterModule,
    AirlinesCounterModule,
    PlaneSeatModule,
    forwardRef(() => TicketCounterModule),
  ],
  exports: [FlightService, FlightRepository],
})
export class FlightModule {}
