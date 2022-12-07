import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaneSeat } from 'src/entities/Plane-seat.entity';
import { SeatDto } from 'src/plane-counter/dtos/new-plane.dto';

@Injectable()
export class PlaneSeatRepository {
  constructor(
    @InjectModel(PlaneSeat.name)
    private readonly planeSeatModel: Model<PlaneSeat>,
  ) {}

  async add(seats: PlaneSeat): Promise<PlaneSeat> {
    const seatModel = new this.planeSeatModel(seats);
    return seatModel.save();
  }

  async addAll(
    planeId: string,
    seats: SeatDto[],
    session,
  ): Promise<PlaneSeat[]> {
    const seatModels = seats.map(
      (seat) =>
        new this.planeSeatModel({
          plane: planeId,
          seatNo: seat.seatNo,
          type: seat.type,
        }),
    );
    const savedSeats = this.planeSeatModel.insertMany(seatModels, {
      session: session,
    });
    return savedSeats;
  }
}
