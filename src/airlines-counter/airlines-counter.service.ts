import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airline } from 'src/entities/Airline.entity';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { QueryFailedError, Repository } from 'typeorm';
import { AirlineDetailDto } from './dtos/airline-detail-response.dto';

@Injectable()
export class AirlinesCounterService {
  constructor(
    @InjectRepository(Airline)
    private airlinesRepository: Repository<Airline>,
    private planeService: PlaneCounterService,
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

  async getAirlineDetail(aId: string): Promise<AirlineDetailDto> {
    const airline = await this.airlinesRepository.findOneBy({ id: aId });
    if (!airline) {
      throw new NotFoundException('Airline not found.', 'NOT_FOUND');
    }

    const planes = await this.planeService.getPlanesBy(`${aId}`);

    const airlineOutput = new AirlineDetailDto();
    const { id, name, totalAirplanes } = airline;
    airlineOutput.id = id;
    airlineOutput.name = name;
    airlineOutput.totalAirplanes = totalAirplanes;
    airlineOutput.planes = planes;

    return airlineOutput;
  }

  findById(id: string) {
    return this.airlinesRepository.findOneBy({ id });
  }
  findByName(name: string) {
    return this.airlinesRepository.findOneBy({ name });
  }
  getAllAirlines() {
    return this.airlinesRepository.find();
  }

  async update(id: string, attr: Partial<Airline>) {
    const airline = await this.airlinesRepository.findOneBy({ id });
    Object.assign(airline, attr);

    return this.airlinesRepository.save(airline);
  }
}
