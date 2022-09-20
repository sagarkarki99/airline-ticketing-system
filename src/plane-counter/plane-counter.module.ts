import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesCounterModule } from 'src/airlines-counter/airlines-counter.module';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { Airline } from 'src/entities/Airline.entity';
import { Plane } from 'src/entities/Plane.entity';
import { PlaneCounterController } from './plane-counter.controller';
import { PlaneCounterService } from './plane-counter.service';

@Module({
  controllers: [PlaneCounterController],
  providers: [PlaneCounterService, AirlinesCounterService],
  imports: [
    TypeOrmModule.forFeature([Plane, Airline]),
    forwardRef(() => AirlinesCounterModule),
  ],
  exports: [PlaneCounterService],
})
export class PlaneCounterModule {}
