import { Injectable } from '@nestjs/common';
import { PlaneSeat } from 'src/entities/Plane-seat.entity';
import { SeatDto } from 'src/plane-counter/dtos/new-plane.dto';
import { PlaneSeatRepository } from './plane-seat.repository';

@Injectable()
export class PlaneSeatService {
  constructor(private readonly repo: PlaneSeatRepository) {}

  async addSeats(planeId: string, seats: SeatDto[]): Promise<PlaneSeat[]> {
    return this.repo.addAll(planeId, seats);
  }
}
