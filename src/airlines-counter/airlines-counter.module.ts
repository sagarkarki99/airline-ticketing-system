import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Airline, AirlineSchema } from 'src/entities/Airline.entity';
import { Plane } from 'src/entities/Plane.entity';
import { PlaneCounterModule } from 'src/plane-counter/plane-counter.module';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { AirlineCounterRepository } from './airline-counter.repository';
import { AirlinesCounterController } from './airlines-counter.controller';
import { AirlinesCounterService } from './airlines-counter.service';

@Module({
  providers: [AirlinesCounterService, AirlineCounterRepository],
  imports: [
    forwardRef(() => PlaneCounterModule),
    MongooseModule.forFeature([{ name: Airline.name, schema: AirlineSchema }]),
  ],
  controllers: [AirlinesCounterController],
  exports: [AirlinesCounterService, AirlineCounterRepository],
})
export class AirlinesCounterModule {}
