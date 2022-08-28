import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from 'src/entities/Flight.entity';
import { PlaneCounterModule } from 'src/plane-counter/plane-counter.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
  controllers: [FlightController],
  providers: [FlightService],
  imports: [TypeOrmModule.forFeature([Flight]), PlaneCounterModule],
  exports: [FlightService],
})
export class FlightModule {}
