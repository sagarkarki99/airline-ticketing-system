import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaneSeat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  seatNo: number;

  @Column()
  seatType: SeatType;
}

enum SeatType {
  business = 'business',
  economy = 'economy',
  firstclass = 'firstclass',
}
