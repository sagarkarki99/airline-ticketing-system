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
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlaneSeat } from './entities/Plane-seat.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TicketCounterModule,
    AirlinesCounterModule,
    MongooseModule.forRoot('mongodb://localhost/airline-db'),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'airlines-db.sqlite',
      entities: [Airline, Plane, Flight, Ticket, PlaneSeat],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PlaneCounterModule,
    FlightModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
