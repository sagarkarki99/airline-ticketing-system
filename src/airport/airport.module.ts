import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Airport, AirportSchema } from 'src/entities/Airport.entity';
import { AirportController } from './airport.controller';
import { AirportRepository } from './airport.repository';
import { AirportService } from './airport.service';

@Module({
  controllers: [AirportController],
  providers: [AirportService, AirportRepository],
  imports: [
    MongooseModule.forFeature([{ name: Airport.name, schema: AirportSchema }]),
  ],
})
export class AirportModule {}
