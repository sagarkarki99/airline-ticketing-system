import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type AirlineDocument = Airline & mongoose.Document;

@Schema()
export class Airline {
  @Prop({ unique: true })
  name: string;
}

export const AirlineSchema = SchemaFactory.createForClass(Airline);
