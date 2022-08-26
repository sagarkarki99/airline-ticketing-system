import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from 'src/entities/Airline.entity';
import { AirlinesCounterController } from './airlines-counter.controller';
import { AirlinesCounterService } from './airlines-counter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Airline])],
  controllers: [AirlinesCounterController],
  providers: [AirlinesCounterService],
})
export class AirlinesCounterModule {}
