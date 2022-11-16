import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirlinesCounterModule } from 'src/airlines-counter/airlines-counter.module';
import { Flight, FlightSchema } from 'src/entities/Flight.entity';
import { Ticket } from 'src/entities/Ticket.entity';
import { PlaneCounterModule } from 'src/plane-counter/plane-counter.module';
import { TicketCounterModule } from 'src/ticket-counter/ticket-counter.module';
import { FlightController } from './flight.controller';
import { FlightRepository } from './flight.repository';
import { FlightService } from './flight.service';

@Module({
  controllers: [FlightController],
  providers: [FlightService, FlightRepository],
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    PlaneCounterModule,
    AirlinesCounterModule,
    forwardRef(() => TicketCounterModule),
  ],
  exports: [FlightService, FlightRepository],
})
export class FlightModule {}
