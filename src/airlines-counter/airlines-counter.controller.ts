import { Controller } from '@nestjs/common';
import { AirlinesCounterService } from './airlines-counter.service';

@Controller('airlines-counter')
export class AirlinesCounterController {
  constructor(private airlinesCounterService: AirlinesCounterService) {}
}
