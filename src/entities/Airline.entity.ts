import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
}
