import { Test, TestingModule } from '@nestjs/testing';
import { TicketCounterController } from './ticket-counter.controller';

describe('TicketCounterController', () => {
  let controller: TicketCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketCounterController],
    }).compile();

    controller = module.get<TicketCounterController>(TicketCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
