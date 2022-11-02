import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airline } from 'src/entities/Airline.entity';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { QueryFailedError, Repository } from 'typeorm';
import { AirlineCounterRepository } from './airline-counter.repository';
import { AirlineDetailDto } from './dtos/airline-detail-response.dto';

@Injectable()
export class AirlinesCounterService {
  constructor(
    private airlinesRepository: AirlineCounterRepository,
    @Inject(forwardRef(() => PlaneCounterService))
    private planeService: PlaneCounterService,
  ) {}

  async addNew(name: string) {
    const airline = await this.airlinesRepository.add(name);
    console.log(airline.name);

    return airline;
  }

  async getAirlineDetail(aId: string): Promise<AirlineDetailDto> {
    const airline = await this.airlinesRepository.findById(aId);
    if (!airline) {
      throw new NotFoundException('Airline not found.', 'NOT_FOUND');
    }

    const planes = await this.planeService.getPlanesBy(`${aId}`);

    const airlineOutput = new AirlineDetailDto();
    const { id, name } = airline;
    airlineOutput.id = id;
    airlineOutput.name = name;

    airlineOutput.planes = planes;

    return airlineOutput;
  }

  findById(id: string) {
    return this.airlinesRepository.findById(id);
  }

  findByName(name: string) {
    return this.airlinesRepository.findByName(name);
  }
  getAllAirlines() {
    return this.airlinesRepository.getAllAirlines();
  }

  async update(id: string, attr: Partial<Airline>) {
    console.log(`Before: ${attr.name}`);

    const airline = await this.airlinesRepository.findById(id);
    Object.assign(airline, attr);
    console.log(`After: ${airline.name}`);

    return this.airlinesRepository.update(id, airline);

    // return this.airlinesRepository.save(airline);
  }
}
