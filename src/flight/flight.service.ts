import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/entities/Flight.entity';
import { Plane } from 'src/entities/Plane.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight) private readonly repo: Repository<Flight>,
  ) {}

  async add(planeId: string, date: number) {
    const flight = await this.repo.create({ planeId, date });
    return this.repo.save(flight);
  }

  getFlights(planeId?: string, date?: number) {
    return this.repo.findBy({ planeId });
  }
}
