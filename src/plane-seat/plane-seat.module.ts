import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaneSeat, PlaneSeatSchema } from 'src/entities/Plane-seat.entity';
import { PlaneSeatController } from './plane-seat.controller';
import { PlaneSeatRepository } from './plane-seat.repository';
import { PlaneSeatService } from './plane-seat.service';

@Module({
  controllers: [PlaneSeatController],
  imports: [
    MongooseModule.forFeature([
      { name: PlaneSeat.name, schema: PlaneSeatSchema },
    ]),
  ],
  providers: [PlaneSeatService, PlaneSeatRepository],
  exports: [PlaneSeatService],
})
export class PlaneSeatModule {}
