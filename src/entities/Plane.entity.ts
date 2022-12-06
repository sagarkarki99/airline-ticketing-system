import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Airline } from './Airline.entity';

export type PlaneDocument = Plane & mongoose.Document;

@Schema()
export class Plane {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Airline' })
  airline: Airline;

  @Prop({ unique: true })
  name: string;
}

export const PlaneSchema = SchemaFactory.createForClass(Plane);
