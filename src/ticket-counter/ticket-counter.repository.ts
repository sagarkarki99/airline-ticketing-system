import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema } from 'mongoose';
import { BaseRepository } from 'src/core/database/base.repository';
import { FlightDocument } from 'src/entities/Flight.entity';
import {
  Ticket,
  TicketDocument,
  TicketStatus,
} from 'src/entities/Ticket.entity';

@Injectable()
export class TicketCounterRepository extends BaseRepository<TicketDocument> {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {
    super(ticketModel);
  }

  async fingByFlight(flightId: string) {
    return this.find({ flightId: flightId });
  }

  async findByUser(userId: mongoose.Schema.Types.ObjectId) {
    return await this.ticketModel
      .find({ userId: userId }, { __v: 0 })
      .populate('flightId', { __v: 0 });
  }

  async findOne(ticketId: string): Promise<TicketDocument> {
    const ticketDoc = await (
      await this.ticketModel.findOne({ id: ticketId }, { __v: 0 })
    ).populate('flightId', { __v: 0 });

    return ticketDoc;
  }

  async saveTicket(seatId: string, userId: string, flight: FlightDocument) {
    const ticket = await this.ticketModel.create({
      seatId,
      userId,
      flightId: flight.id,
      createdOn: new Date().getDate(),
      status: TicketStatus.booked,
    });
    const value = await this.save(ticket);
    return value;
  }
}
