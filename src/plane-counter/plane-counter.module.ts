import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from 'src/entities/Plane.entity';
import { PlaneCounterController } from './plane-counter.controller';
import { PlaneCounterService } from './plane-counter.service';

@Module({
  controllers: [PlaneCounterController],
  providers: [PlaneCounterService],
  imports: [TypeOrmModule.forFeature([Plane])],
  exports: [PlaneCounterService],
})
export class PlaneCounterModule {}
