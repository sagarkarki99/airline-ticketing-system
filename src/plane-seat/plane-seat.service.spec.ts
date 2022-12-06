import { Test, TestingModule } from '@nestjs/testing';
import { PlaneSeatService } from './plane-seat.service';

describe('PlaneSeatService', () => {
  let service: PlaneSeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaneSeatService],
    }).compile();

    service = module.get<PlaneSeatService>(PlaneSeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
