import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirlinesCounterModule } from 'src/airlines-counter/airlines-counter.module';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { Airline } from 'src/entities/Airline.entity';
import { PlaneSeat, PlaneSeatSchema } from 'src/entities/Plane-seat.entity';
import { Plane, PlaneSchema } from 'src/entities/Plane.entity';
import { PlaneSeatModule } from 'src/plane-seat/plane-seat.module';
import { PlaneCounterController } from './plane-counter.controller';
import { PlaneCounterRepository } from './plane-counter.repository';
import { PlaneCounterService } from './plane-counter.service';

@Module({
  controllers: [PlaneCounterController],
  providers: [
    PlaneCounterService,
    AirlinesCounterService,
    PlaneCounterRepository,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Plane.name, schema: PlaneSchema }]),
    forwardRef(() => AirlinesCounterModule),
    PlaneSeatModule,
  ],
  exports: [PlaneCounterService, PlaneCounterRepository],
})
export class PlaneCounterModule {}
