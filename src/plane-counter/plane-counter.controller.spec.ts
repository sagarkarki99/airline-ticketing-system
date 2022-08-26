import { Test, TestingModule } from '@nestjs/testing';
import { PlaneCounterController } from './plane-counter.controller';

describe('PlaneCounterController', () => {
  let controller: PlaneCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaneCounterController],
    }).compile();

    controller = module.get<PlaneCounterController>(PlaneCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
