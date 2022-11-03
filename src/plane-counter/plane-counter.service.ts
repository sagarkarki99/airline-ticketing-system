import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { PlaneSeat, SeatType } from 'src/entities/Plane-seat.entity';
import { Plane } from 'src/entities/Plane.entity';
import { NewPlaneDto, SeatDto } from './dtos/new-plane.dto';
import { PlaneResponseDto } from './dtos/plane-detail-response.dto';
import { PlaneCounterRepository } from './plane-counter.repository';
import { PlaneSeatRepository } from './plane-seat.repository';

@Injectable()
export class PlaneCounterService {
  constructor(
    private readonly repo: PlaneCounterRepository,
    private readonly seatRepo: PlaneSeatRepository,

    @Inject(forwardRef(() => AirlinesCounterService))
    private airlineService: AirlinesCounterService,
  ) {}

  async add(body: NewPlaneDto): Promise<Plane> {
    // const queryRunner = await this.initiateQueryRunnerTransaction(body);

    const plane = await this.repo.addNew(
      body.airlineId.trim(),
      body.name.trim(),
    );

    await this.saveSeats(plane.id, body.seats);
    return plane;
  }

  async saveSeats(planeId: string, seats: SeatDto[]) {
    this.seatRepo.addAll(planeId, seats);
    // for (let i = 0; i < seats.length; i++) {
    //   const s = seats[i];
    //   const entity = this.dataSource.getRepository(PlaneSeat).create({
    //     seatType: getSeatType(s.type),
    //     seatNo: s.seatNo,
    //     planeId: planeId,
    //   });
    //   seatEntities.push(entity);
    // }

    // queryRunner.manager.insert(PlaneSeat, seatEntities);
  }

  getPlanesBy(airlineId: string | undefined) {
    if (airlineId === undefined) {
      return this.getAllPlanes();
    }
    return this.repo.findByAirlineId(airlineId);
  }

  async getPlaneById(pId: string): Promise<PlaneResponseDto> {
    const plane = await this.repo.findById(pId);
    if (!plane) {
      throw new NotFoundException('Plane not found');
    }
    console.log(`${plane.airline}`);

    const airline = await this.airlineService.findById(
      plane.airline as unknown as string,
    );
    const { id, name } = plane;
    const planeResponse = new PlaneResponseDto();
    planeResponse.id = id;
    planeResponse.name = name;
    planeResponse.airline = airline;
    return planeResponse;
  }

  removePlane(planeId: string) {
    return this.repo.delete(planeId);
  }
  private getAllPlanes() {
    return this.repo.findAll();
  }
}

function getSeatType(type: string): SeatType {
  if (type === 'business') {
    return SeatType.business;
  } else if (type === 'economy') {
    return SeatType.economy;
  } else if (type === 'firstclass') {
    return SeatType.firstclass;
  } else {
    throw new UnprocessableEntityException('SeatType is not a valid type.');
  }
}
function TransactionRepository() {
  throw new Error('Function not implemented.');
}

type Seat = {};
