import { Test, TestingModule } from '@nestjs/testing';
import { AirlinesCounterService } from './airlines-counter.service';

describe('AirlinesCounterService', () => {
  let service: AirlinesCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirlinesCounterService],
    }).compile();

    service = module.get<AirlinesCounterService>(AirlinesCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
