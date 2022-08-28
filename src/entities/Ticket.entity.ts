import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

export enum TicketStatus {
  booked = 'booked',
  cancelled = 'cancelled',
  success = 'success',
}
