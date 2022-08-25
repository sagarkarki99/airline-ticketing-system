import { Test, TestingModule } from '@nestjs/testing';
import { AirlinesCounterController } from './airlines-counter.controller';

describe('AirlinesCounterController', () => {
  let controller: AirlinesCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirlinesCounterController],
    }).compile();

    controller = module.get<AirlinesCounterController>(AirlinesCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
