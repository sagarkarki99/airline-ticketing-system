import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesCounterModule } from 'src/airlines-counter/airlines-counter.module';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { Airline } from 'src/entities/Airline.entity';
import { PlaneSeat, PlaneSeatSchema } from 'src/entities/Plane-seat.entity';
import { Plane, PlaneSchema } from 'src/entities/Plane.entity';
import { PlaneCounterController } from './plane-counter.controller';
import { PlaneCounterRepository } from './plane-counter.repository';
import { PlaneCounterService } from './plane-counter.service';
import { PlaneSeatRepository } from './plane-seat.repository';

@Module({
  controllers: [PlaneCounterController],
  providers: [
    PlaneCounterService,
    AirlinesCounterService,
    PlaneCounterRepository,
    PlaneSeatRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([Plane, Airline, PlaneSeat]),
    MongooseModule.forFeature([
      { name: Plane.name, schema: PlaneSchema },
      { name: PlaneSeat.name, schema: PlaneSeatSchema },
    ]),
    forwardRef(() => AirlinesCounterModule),
  ],
  exports: [PlaneCounterService, PlaneCounterRepository, PlaneSeatRepository],
})
export class PlaneCounterModule {}
