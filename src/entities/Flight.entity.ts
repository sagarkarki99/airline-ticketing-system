import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  planId: string;

  @Column()
  dateTime: Date;

  @Column()
  isSeatAvailable: boolean;
}
