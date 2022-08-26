import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plane {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  airlineId: string;

  @Column()
  name: string;
}
