import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight, FlightStatus } from 'src/entities/Flight.entity';
import { PlaneCounterService } from 'src/plane-counter/plane-counter.service';
import { Repository } from 'typeorm';
import { UpdateFlightDto } from './dtos/update-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight) private readonly repo: Repository<Flight>,
    private readonly planeService: PlaneCounterService,
  ) {}

  async add(planeId: string, date: number) {
    const d = new Date(date);
    console.log(`Creating date with ${d}`);

    const plane = await this.planeService.getPlaneById(planeId);
    if (!plane) {
      throw new BadRequestException('Plane not found with the given id');
    }
    const flight = await this.repo.create({
      planeId,
      date: d.getTime(),
      availableSeats: plane.totalSeats,
      status: FlightStatus.ready,
    });
    return this.repo.save(flight);
  }

  getFlights(planeId?: string, date?: number) {
    var dateTime: Date | undefined;

    if (date) {
      dateTime = new Date(date);
      console.log(`date is ${date} and Date: ${dateTime}`);
    }
    return this.repo.find({
      where: {
        planeId,
        date: dateTime?.getTime(),
      },
    });
  }

  async getFlightById(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, body: UpdateFlightDto) {
    const flight = await this.repo.findOneBy({ id });
    if (!flight) {
      throw new NotFoundException('Flight not found!');
    }
    Object.assign(flight, { status: body.status });
    return this.repo.save(flight);
  }
}
