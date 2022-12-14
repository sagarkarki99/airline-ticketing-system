import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { Airline, AirlineDocument } from 'src/entities/Airline.entity';

@Injectable()
export class AirlineCounterRepository extends BaseRepository<AirlineDocument> {
  constructor(
    @InjectModel(Airline.name)
    private readonly airlineModel: Model<AirlineDocument>,
  ) {
    super(airlineModel);
  }

  async add(name: string): Promise<Airline> {
    try {
      const model = await this.airlineModel.create({ name });
      return this.save(model);
    } catch (error) {
      Logger.error(error, 'AirlineCounterRepository');
      throw new UnprocessableEntityException('Airline already exists.');
    }
  }

  // async findById(id: string): Promise<Airline> {
  //   const airline = await this.airlineModel.findById(id);
  //   return airline;
  // }

  async findByName(name: string): Promise<Airline> {
    const airline = await this.findOneBy({ name });
    return airline;
  }

  async getAllAirlines(): Promise<Airline[]> {
    const airlines = await this.find();
    return airlines;
  }
}
