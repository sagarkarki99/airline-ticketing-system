import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlineEntity } from 'src/entities/AirlineEntity';
import { Repository } from 'typeorm';

@Injectable()
export class AirlinesCounterService {
  constructor(
    @InjectRepository(AirlineEntity)
    private airlinesRepository: Repository<AirlineEntity>,
  ) {}

  addNew(airlineName: string, totalAirplanes: number) {
    const airline = this.airlinesRepository.create({
      name: airlineName,
      totalAirplanes,
    });
    return this.airlinesRepository.save(airline);
  }

  findById(id: number) {
    return this.airlinesRepository.findOneBy({ id });
  }
  findByName(name: string) {
    return this.airlinesRepository.findOneBy({ name });
  }

  async update(id: number, attr: Partial<AirlineEntity>) {
    const airline = await this.airlinesRepository.findOneBy({ id });
    Object.assign(airline, attr);
    return this.airlinesRepository.save(airline);
  }
}
