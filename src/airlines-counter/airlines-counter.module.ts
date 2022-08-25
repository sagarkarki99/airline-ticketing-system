import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from 'src/entities/AirlineEntity';
import { AirlinesCounterController } from './airlines-counter.controller';
import { AirlinesCounterService } from './airlines-counter.service';

@Module({
  imports: [TypeOrmModule.forFeature([AirlineEntity])],
  controllers: [AirlinesCounterController],
  providers: [AirlinesCounterService],
})
export class AirlinesCounterModule {}
