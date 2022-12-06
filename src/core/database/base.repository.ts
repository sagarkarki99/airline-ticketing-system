import { HttpException, Logger } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';

export abstract class BaseRepository<T extends any> {
  constructor(private readonly model: Model<T>) {}

  async save(m: T) {
    try {
      const createdModel = new this.model(m);
      return await createdModel.save();
    } catch (error) {
      Logger.error(error.toString(), BaseRepository.name);
      if (error.code === 11000) {
        throw new HttpException('Plane already exist.', 409);
      }
    }
  }

  async findById(id: string) {
    return this.model.findById(id, { __v: 0 }).exec();
  }

  async find(query: FilterQuery<T> = {}) {
    return this.model.find(query, { __v: 0 }).exec();
  }

  async findOneBy(query: FilterQuery<T>) {
    return this.model.findOne(query, { __v: 0 }).exec();
  }

  async update(id: string, attr: Partial<T>) {
    return this.model.findByIdAndUpdate(id, attr, { __v: 0, new: true }).exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
