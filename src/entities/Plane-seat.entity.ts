export class PlaneSeat {
  seatNo: number;
  seatType: SeatType;
}

enum SeatType {
  business = 'business',
  economy = 'economy',
  firstclass = 'firstclass',
}
