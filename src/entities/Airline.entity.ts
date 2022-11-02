import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Airline {
  @Prop({ _id: true })
  id: string;

  @Prop({ unique: true })
  name: string;
}

export const AirlineSchema = SchemaFactory.createForClass(Airline);
