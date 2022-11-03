import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { Flight, FlightDocument } from 'src/entities/Flight.entity';

@Injectable()
export class FlightRepository extends BaseRepository<FlightDocument> {
  constructor(
    @InjectModel(Flight.name)
    private readonly flightModel: Model<FlightDocument>,
  ) {
    super(flightModel);
  }

  async add(planeId: string, date: Date) {
    const flightModel = new this.flightModel({ planeId, departureDate: date });
    return this.save(flightModel);
  }
}
