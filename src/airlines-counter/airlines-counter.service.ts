import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlineEntity } from 'src/entities/AirlineEntity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class AirlinesCounterService {
  constructor(
    @InjectRepository(AirlineEntity)
    private airlinesRepository: Repository<AirlineEntity>,
  ) {}

  async addNew(name: string, totalAirplanes: number) {
    try {
      const airline = this.airlinesRepository.create({
        name,
        totalAirplanes,
      });
      console.log(airline.name);

      const value = await this.airlinesRepository.save(airline);
      console.log(`This is value : ${value}`);
      return value;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException('Airline name already exist', 422);
      }
      console.log(`This is error in catch block : ${error}`);
    }
  }

  findById(id: number) {
    return this.airlinesRepository.findOneBy({ id });
  }
  findByName(name: string) {
    return this.airlinesRepository.findOneBy({ name });
  }
  getAllAirlines() {
    return this.airlinesRepository.find();
  }

  async update(id: number, attr: Partial<AirlineEntity>) {
    const airline = await this.airlinesRepository.findOneBy({ id });
    Object.assign(airline, attr);

    return this.airlinesRepository.save(airline);
  }
}
