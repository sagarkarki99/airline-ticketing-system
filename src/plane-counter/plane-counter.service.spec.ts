import { Test, TestingModule } from '@nestjs/testing';
import { PlaneCounterService } from './plane-counter.service';

describe('PlaneCounterService', () => {
  let service: PlaneCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaneCounterService],
    }).compile();

    service = module.get<PlaneCounterService>(PlaneCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
