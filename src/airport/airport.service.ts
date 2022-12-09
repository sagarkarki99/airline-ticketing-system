import { Injectable } from '@nestjs/common';
import { Airport } from 'src/entities/Airport.entity';
import { AirportRepository } from './airport.repository';
import { NewAirportDto } from './dtos/new-airport.dto';

@Injectable()
export class AirportService {
  constructor(private readonly repo: AirportRepository) {}

  addAirport(newAirportDto: NewAirportDto) {
    return this.repo.addNew(newAirportDto);
  }
}
