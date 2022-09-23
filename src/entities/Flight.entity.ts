import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  planeId: string;

  @Column()
  date: number;

  @Column()
  status: string;
}

export enum FlightStatus {
  inAir = 'inAir',
  postponed = 'postponed',
  completed = 'completed',
  ready = 'ready',
}
