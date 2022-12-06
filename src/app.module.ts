import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketCounterModule } from './ticket-counter/ticket-counter.module';
import { AirlinesCounterModule } from './airlines-counter/airlines-counter.module';
import { PlaneCounterModule } from './plane-counter/plane-counter.module';
import { FlightModule } from './flight/flight.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaneSeatModule } from './plane-seat/plane-seat.module';

@Module({
  imports: [
    TicketCounterModule,
    AirlinesCounterModule,
    MongooseModule.forRoot('mongodb://localhost/airline-db'),
    PlaneCounterModule,
    FlightModule,
    AuthModule,
    UsersModule,
    PlaneSeatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
