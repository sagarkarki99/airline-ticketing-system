import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesCounterModule } from 'src/airlines-counter/airlines-counter.module';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { Flight, FlightSchema } from 'src/entities/Flight.entity';
import { Ticket } from 'src/entities/Ticket.entity';
import { FlightModule } from 'src/flight/flight.module';
import { FlightRepository } from 'src/flight/flight.repository';
import { FlightService } from 'src/flight/flight.service';
import { PlaneCounterModule } from 'src/plane-counter/plane-counter.module';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { TicketCounterController } from './ticket-counter.controller';
import { TicketCounterService } from './ticket-counter.service';

@Module({
  controllers: [TicketCounterController],
  providers: [
    TicketCounterService,
    FlightService,
    PlaneCounterService,
    FlightRepository,
    AirlinesCounterService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => FlightModule),
    PlaneCounterModule,
    AirlinesCounterModule,
  ],
  exports: [TicketCounterService],
})
export class TicketCounterModule {}
