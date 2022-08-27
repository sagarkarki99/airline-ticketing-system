import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/entities/Flight.entity';
import { Plane } from 'src/entities/Plane.entity';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { Repository } from 'typeorm';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight) private readonly repo: Repository<Flight>,
    private readonly planeService: PlaneCounterService,
  ) {}

  async add(planeId: string, date: number) {
    const plane = await this.planeService.getPlaneById(planeId);
    const flight = await this.repo.create({
      planeId,
      date,
      availableSeats: plane.totalSeats,
    });
    return this.repo.save(flight);
  }

  getFlights(planeId?: string, date?: number) {
    return this.repo.findBy({ planeId });
  }
}
