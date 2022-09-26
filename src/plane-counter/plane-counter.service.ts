import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlinesCounterService } from 'src/airlines-counter/airlines-counter.service';
import { PlaneSeat, SeatType } from 'src/entities/Plane-seat.entity';
import { Plane } from 'src/entities/Plane.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import SeatDto, { NewPlaneDto } from './dtos/new-plane.dto';
import { PlaneResponseDto } from './dtos/plane-detail-response.dto';

@Injectable()
export class PlaneCounterService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Plane) private readonly repo: Repository<Plane>,

    @Inject(forwardRef(() => AirlinesCounterService))
    private airlineService: AirlinesCounterService,
  ) {}

  async add(body: NewPlaneDto) {
    const queryRunner = await this.initiateQueryRunnerTransaction(body);

    try {
      const plane = this.repo.create({
        name: body.name.trim(),
        airlineId: body.airlineId.trim(),
      });
      const savedPlane = await queryRunner.manager.save(plane);
      await this.saveSeats(queryRunner, savedPlane.id, body.seats);
      await queryRunner.commitTransaction();
      return savedPlane;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new UnprocessableEntityException('Failed to add planes.');
    } finally {
      await queryRunner.release();
    }
  }

  async initiateQueryRunnerTransaction(body: NewPlaneDto) {
    const runner = await this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    return runner;
  }

  async saveSeats(queryRunner: QueryRunner, planeId: string, seats: SeatDto[]) {
    let seatEntities: Array<PlaneSeat> = [];

    for (let i = 0; i < seats.length; i++) {
      const s = seats[i];
      const entity = this.dataSource.getRepository(PlaneSeat).create({
        seatType: getSeatType(s.type),
        seatNo: s.seatNo,
        planeId: planeId,
      });
      seatEntities.push(entity);
    }

    queryRunner.manager.insert(PlaneSeat, seatEntities);
  }

  getPlanesBy(airlineId: string | undefined) {
    if (airlineId === undefined) {
      return this.getAllPlanes();
    }
    return this.repo.findBy({ airlineId });
  }

  async getPlaneById(pId: string): Promise<PlaneResponseDto> {
    const plane = await this.repo.findOneBy({ id: pId });
    if (!plane) {
      throw new NotFoundException('Plane not found');
    }

    const airline = await this.airlineService.findById(plane.airlineId);
    const { id, name } = plane;
    const planeResponse = new PlaneResponseDto();
    planeResponse.id = id;
    planeResponse.name = name;
    planeResponse.airline = airline;
    return planeResponse;
  }

  removePlane(planeId: string) {
    return this.repo.delete({ id: planeId });
  }
  private getAllPlanes() {
    return this.repo.find();
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
