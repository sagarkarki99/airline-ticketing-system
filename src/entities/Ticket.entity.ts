import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TicketStatus {
  booked = 'booked',
  cancelled = 'cancelled',
  success = 'success',
  expired = 'expired',
}

export type TicketDocument = Ticket & mongoose.Document;
@Schema()
export class Ticket {
  @Prop({ type: String, ref: 'PlaneSeat' })
  seatId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' })
  flightId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  createdOn: number;

  @Prop({ type: String, enum: TicketStatus })
  status: TicketStatus;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
