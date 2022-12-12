import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { PlaneSeat } from 'src/entities/Plane-seat.entity';
import { SeatDto } from 'src/plane-counter/dtos/new-plane.dto';

@Injectable()
export class PlaneSeatRepository extends BaseRepository<PlaneSeat> {
  constructor(
    @InjectModel(PlaneSeat.name)
    private readonly planeSeatModel: Model<PlaneSeat>,
  ) {
    super(planeSeatModel);
  }

  async add(seats: PlaneSeat): Promise<PlaneSeat> {
    const seatModel = new this.planeSeatModel(seats);
    return seatModel.save();
  }

  async addAll(planeId: string, seats: SeatDto[]): Promise<PlaneSeat[]> {
    const seatModels = seats.map(
      (seat) =>
        new this.planeSeatModel({
          plane: planeId,
          seatNo: seat.seatNo,
          type: seat.type,
        }),
    );
    const savedSeats = this.planeSeatModel.insertMany(seatModels);
    return savedSeats;
  }
}
