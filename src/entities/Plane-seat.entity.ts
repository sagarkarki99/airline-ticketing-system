import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Plane } from './Plane.entity';

export enum SeatType {
  business = 'business',
  economy = 'economy',
  firstclass = 'firstclass',
}

export type PlaneSeatDocument = PlaneSeat & mongoose.Document;
@Schema({ collection: 'planeSeats' })
export class PlaneSeat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plane' })
  plane: Plane;

  @Prop()
  seatNo: string;

  @Prop({ type: String, enum: SeatType })
  type: SeatType;
}

export const PlaneSeatSchema = SchemaFactory.createForClass(PlaneSeat);
