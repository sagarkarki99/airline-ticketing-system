import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type AirportDocument = Airport & mongoose.Document;

@Schema()
export class Airport {
  @Prop()
  name: string;

  @Prop()
  city: string;

  @Prop({ unique: true })
  code: string;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);
