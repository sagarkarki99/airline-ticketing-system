import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaneSeat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  planeId: string;

  @Column()
  seatNo: string;

  @Column()
  seatType: SeatType;
}

export enum SeatType {
  business = 'business',
  economy = 'economy',
  firstclass = 'firstclass',
}
