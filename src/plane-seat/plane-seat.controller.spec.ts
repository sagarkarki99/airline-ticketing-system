import { Test, TestingModule } from '@nestjs/testing';
import { PlaneSeatController } from './plane-seat.controller';

describe('PlaneSeatController', () => {
  let controller: PlaneSeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaneSeatController],
    }).compile();

    controller = module.get<PlaneSeatController>(PlaneSeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
