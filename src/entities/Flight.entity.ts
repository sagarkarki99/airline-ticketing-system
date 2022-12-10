import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Airport } from './Airport.entity';

export enum FlightStatus {
  inAir = 'inAir',
  postponed = 'postponed',
  completed = 'completed',
  ready = 'ready',
}

export type FlightDocument = Flight & mongoose.Document;

@Schema()
export class Flight {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plane' })
  planeId: string;

  @Prop()
  departureDate: Date;

  @Prop({ type: String, ref: 'Airport' })
  from: string;

  @Prop({ type: String, ref: 'Airport' })
  to: string;

  @Prop({ type: String, enum: FlightStatus, default: FlightStatus.ready })
  status: FlightStatus;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
