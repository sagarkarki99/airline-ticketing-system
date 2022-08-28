import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Ticket {
  @PrimaryGeneratedColumn()
  ticketNo: number;

  @Column()
  seatNo: number;

  @Column()
  flightId: string;

  @Column()
  userId: string;

  @Column()
  createdOn: number;

  @Column()
  status: TicketStatus;
}

enum TicketStatus {
  booked,
  cancelled,
  success,
}
