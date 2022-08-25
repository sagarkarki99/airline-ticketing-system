import { Test, TestingModule } from '@nestjs/testing';
import { TicketCounterService } from './ticket-counter.service';

describe('TicketCounterService', () => {
  let service: TicketCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketCounterService],
    }).compile();

    service = module.get<TicketCounterService>(TicketCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
