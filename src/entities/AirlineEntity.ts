import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AirlineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  totalAirplanes: number;
}
