import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { Flight, FlightDocument } from 'src/entities/Flight.entity';
import { NewFlightDto } from './dtos/new-flight.dto';

@Injectable()
export class FlightRepository extends BaseRepository<FlightDocument> {
  constructor(
    @InjectModel(Flight.name)
    private readonly flightModel: Model<FlightDocument>,
  ) {
    super(flightModel);
  }

  async add(newFlightDto: NewFlightDto) {
    const fullDate = newFlightDto.fullDate();
    const flightModel = new this.flightModel({
      planeId: newFlightDto.planeId,
      departureDate: fullDate,
      to: newFlightDto.to,
      from: newFlightDto.from,
    });
    const doc = await this.save(flightModel);
    return doc;
  }

  async getAllFlightsFor(planeId?: string, date?: number) {
    if (date && planeId) {
      const dateTime = new Date(date);
      Logger.log(`date is ${date} and Date: ${dateTime}`);
      return this.find({
        where: {
          planeId,
          departureDate: dateTime,
        },
      });
    } else if (date) {
      const dateTime = new Date(date);
      return this.find({
        where: {
          departureDate: dateTime,
        },
      });
    } else if (planeId) {
      return this.find({
        where: {
          planeId,
        },
      });
    } else {
      return this.find();
    }
  }
}
