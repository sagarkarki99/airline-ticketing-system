import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from 'src/entities/Airline.entity';
import { Plane } from 'src/entities/Plane.entity';
import { PlaneCounterModule } from 'src/plane-counter/plane-counter.module';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { AirlinesCounterController } from './airlines-counter.controller';
import { AirlinesCounterService } from './airlines-counter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Airline, Plane]), PlaneCounterModule],
  controllers: [AirlinesCounterController],
  providers: [AirlinesCounterService, PlaneCounterService],
})
export class AirlinesCounterModule {}
