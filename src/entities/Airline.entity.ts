import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  totalAirplanes: number;
}
