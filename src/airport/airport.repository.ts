import { HttpException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { Airport, AirportDocument } from 'src/entities/Airport.entity';
import { NewAirportDto } from './dtos/new-airport.dto';

export class AirportRepository extends BaseRepository<AirportDocument> {
  constructor(
    @InjectModel(Airport.name)
    private readonly airportModel: Model<AirportDocument>,
  ) {
    super(airportModel);
  }

  async addNew({ name, city, code }: NewAirportDto) {
    try {
      const model = new this.airportModel({ name, city, code });
      return await this.save(model);
    } catch (error) {
      if (error instanceof Error && error.message === 'DUBLICATE_VALUE') {
        throw new HttpException(`Airport already exist for code ${code}`, 409);
      }
      throw new UnprocessableEntityException('Failed to add airport.');
    }
  }
}
