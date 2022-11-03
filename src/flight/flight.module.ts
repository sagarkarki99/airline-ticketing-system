import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesCounterModule } from 'src/airlines-counter/airlines-counter.module';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { Flight, FlightSchema } from 'src/entities/Flight.entity';
import { Ticket } from 'src/entities/Ticket.entity';
import { PlaneCounterModule } from 'src/plane-counter/plane-counter.module';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { TicketCounterModule } from 'src/ticket-counter/ticket-counter.module';
import { TicketCounterService } from 'src/ticket-counter/ticket-counter.service';
import { FlightController } from './flight.controller';
import { FlightRepository } from './flight.repository';
import { FlightService } from './flight.service';

@Module({
  controllers: [FlightController],
  providers: [
    FlightService,
    FlightRepository,
    TicketCounterService,
    PlaneCounterService,
    AirlinesCounterService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    TypeOrmModule.forFeature([Flight, Ticket]),
    PlaneCounterModule,
    AirlinesCounterModule,
    forwardRef(() => TicketCounterModule),
  ],
  exports: [FlightService, FlightRepository],
})
export class FlightModule {}
