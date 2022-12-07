import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Error, Model, MongooseError } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { Plane, PlaneDocument } from 'src/entities/Plane.entity';

@Injectable()
export class PlaneCounterRepository extends BaseRepository<Plane> {
  constructor(
    @InjectModel(Plane.name) private readonly planeModel: Model<Plane>,
  ) {
    super(planeModel);
  }

  async addNew(
    airlineId: String,
    name: string,
    session?: ClientSession,
  ): Promise<PlaneDocument> {
    const planeModel = new this.planeModel({ airline: airlineId, name });
    return this.save(planeModel, session);
  }

  async findByAirlineId(airlineId: string): Promise<Plane[]> {
    return this.find({ airline: airlineId });
  }

  async findAll() {
    return this.find();
  }
}
