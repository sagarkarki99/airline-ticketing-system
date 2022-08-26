import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plane } from 'src/entities/Plane.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaneCounterService {
  constructor(
    @InjectRepository(Plane) private readonly repo: Repository<Plane>,
  ) {}

  async add(name: string, airlineId: string) {
    const plane = await this.repo.create({ name, airlineId });
    return this.repo.save(plane);
  }

  getPlanesBy(airlineId: string | undefined) {
    if (airlineId === undefined) {
      return this.getAllPlanes();
    }
    return this.repo.findBy({ airlineId });
  }

  getPlaneById(id: string) {
    return this.repo.findOneBy({ id });
  }

  removePlane(planeId: string) {
    return this.repo.delete({ id: planeId });
  }
  private getAllPlanes() {
    return this.repo.find();
  }
}
