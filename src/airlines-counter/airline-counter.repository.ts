import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { Airline } from 'src/entities/Airline.entity';

@Injectable()
export class AirlineCounterRepository {
  constructor(
    @InjectModel(Airline.name)
    private readonly airlineModel: Model<Airline>,
  ) {}

  async add(name: string): Promise<Airline> {
    try {
      const model = await this.airlineModel.create({ name });
      return model.save();
    } catch (error) {
      Logger.error(error, 'AirlineCounterRepository');
      throw new UnprocessableEntityException('Airline already exists.');
    }
  }

  async findById(id: string): Promise<Airline> {
    const airline = await this.airlineModel.findById(id);
    return airline;
  }

  async findByName(name: string): Promise<Airline> {
    const airline = await this.airlineModel.findOne({ name });
    return airline;
  }

  async getAllAirlines(): Promise<Airline[]> {
    const airlines = await this.airlineModel.find();
    return airlines;
  }

  async update(id: string, attr: Partial<Airline>) {
    return this.airlineModel
      .findOneAndUpdate({ _id: id }, attr, { new: true })
      .exec();
  }
}
