import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plane, PlaneDocument } from 'src/entities/Plane.entity';

@Injectable()
export class PlaneCounterRepository {
  constructor(
    @InjectModel(Plane.name) private readonly planeModel: Model<Plane>,
  ) {}

  async addNew(airlineId: String, name: string): Promise<PlaneDocument> {
    const planeModel = new this.planeModel({ airline: airlineId, name });
    return planeModel.save();
  }

  async findByAirlineId(airlineId: string): Promise<Plane[]> {
    return this.planeModel.find({ airline: airlineId });
  }

  async findById(id: string): Promise<PlaneDocument> {
    return this.planeModel.findById(id);
  }

  async delete(id: string) {
    return this.planeModel.findByIdAndRemove(id);
  }

  async findAll() {
    return this.planeModel.find();
  }
}
