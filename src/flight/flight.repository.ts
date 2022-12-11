import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
      plane: newFlightDto.planeId,
      departureDate: fullDate,
      to: newFlightDto.to,
      from: newFlightDto.from,
    });
    const doc = await this.save(flightModel);
    return doc;
  }

  async getAllFlightsFor(planeId?: string, date?: number) {
    var query: FilterQuery<FlightDocument> = [];
    if (date && planeId) {
      const dateTime = new Date(date);
      Logger.log(`date is ${date} and Date: ${dateTime}`);
      query = {
        plane: planeId,
        departureDate: dateTime,
      };
    } else if (date) {
      const dateTime = new Date(date);
      query = {
        departureDate: dateTime,
      };
    } else if (planeId) {
      query = {
        planeId,
      };
    }

    return this.flightModel
      .find(
        {
          where: query,
        },
        { __v: 0 },
      )
      .populate('plane', { __v: 0 });
  }
}
