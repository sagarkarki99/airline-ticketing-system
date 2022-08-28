import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketCounterModule } from './ticket-counter/ticket-counter.module';
import { AirlinesCounterModule } from './airlines-counter/airlines-counter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from './entities/Airline.entity';
import { PlaneCounterModule } from './plane-counter/plane-counter.module';
import { Plane } from './entities/Plane.entity';
import { FlightModule } from './flight/flight.module';
import { Flight } from './entities/Flight.entity';
import { Ticket } from './entities/Ticket.entity';

@Module({
  imports: [
    TicketCounterModule,
    AirlinesCounterModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'airlines-db.sqlite',
      entities: [Airline, Plane, Flight, Ticket],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PlaneCounterModule,
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
