import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketCounterModule } from './ticket-counter/ticket-counter.module';
import { AirlinesCounterModule } from './airlines-counter/airlines-counter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from './entities/AirlineEntity';

@Module({
  imports: [
    TicketCounterModule,
    AirlinesCounterModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'airlines-db.sqlite',
      entities: [AirlineEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
