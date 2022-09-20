import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { Plane } from 'src/entities/Plane.entity';
import { Repository } from 'typeorm';
import { PlaneResponseDto } from './dtos/plane-detail-response.dto';

@Injectable()
export class PlaneCounterService {
  constructor(
    @InjectRepository(Plane) private readonly repo: Repository<Plane>,
    @Inject(forwardRef(() => AirlinesCounterService))
    private airlineService: AirlinesCounterService,
  ) {}

  async add(name: string, airlineId: string, totalSeats: number) {
    const plane = await this.repo.create({ name, airlineId, totalSeats });
    return this.repo.save(plane);
  }

  getPlanesBy(airlineId: string | undefined) {
    if (airlineId === undefined) {
      return this.getAllPlanes();
    }
    return this.repo.findBy({ airlineId });
  }

  async getPlaneById(pId: string): Promise<PlaneResponseDto> {
    const plane = await this.repo.findOneBy({ id: pId });
    if (!plane) {
      throw new NotFoundException('Plane not found');
    }

    const airline = await this.airlineService.findById(plane.airlineId);
    const { id, name, totalSeats } = plane;
    const planeResponse = new PlaneResponseDto();
    planeResponse.id = id;
    planeResponse.name = name;
    planeResponse.totalSeats = totalSeats;
    planeResponse.airline = airline;
    return planeResponse;
  }

  removePlane(planeId: string) {
    return this.repo.delete({ id: planeId });
  }
  private getAllPlanes() {
    return this.repo.find();
  }
}
