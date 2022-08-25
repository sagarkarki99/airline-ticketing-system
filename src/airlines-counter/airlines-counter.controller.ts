import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AirlinesCounterService } from './airlines-counter.service';
import { NewAirlineDto, UpdateAirlineDto } from './dtos/airline.dto';

@Controller('airlines')
export class AirlinesCounterController {
  constructor(private airlinesCounterService: AirlinesCounterService) {}

  @Post('/')
  async createNew(@Body() body: NewAirlineDto) {
    console.log(body);

    const line = await this.airlinesCounterService.addNew(
      body.name,
      body.totalAirplanes,
    );
    console.log('Added successfully///');

    console.log(line);
  }

  @Get('/')
  getAllAirlines() {
    return this.airlinesCounterService.getAllAirlines();
  }

  @Get('/:id')
  async getAirline(@Param('id') id: string) {
    const airline = await this.airlinesCounterService.findById(parseInt(id));
    if (!airline) {
      throw new NotFoundException('Airline not found.', 'NOT_FOUND');
    }
  }

  @Post(':id/addMorePlanes')
  addAirplaneFor(@Param('id') id: string, @Body() airplanes: number) {}

  @Patch('/:id')
  updateAirplane(id: string, @Body() body: UpdateAirlineDto) {
    return this.airlinesCounterService.update(parseInt(id), body);
  }
}
