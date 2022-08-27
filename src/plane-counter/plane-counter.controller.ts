import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { NewPlaneDto } from './dtos/new-plane.dto';
import { PlaneCounterService } from './plane-counter.service';

@Controller('planes')
export class PlaneCounterController {
  constructor(private readonly service: PlaneCounterService) {}

  @Post('/')
  addNew(@Body() body: NewPlaneDto) {
    return this.service.add(body.name, body.airlineId, body.totalSeats);
  }

  @Get('/')
  getPlanesBy(@Query('airlineId') airlineId?: string) {
    if (this.isValidId(airlineId)) {
      throw new BadRequestException('Id is not valid');
    }
    return this.service.getPlanesBy(airlineId);
  }

  @Get('/:id')
  async getPlanesById(@Param('id') id: string) {
    if (this.isValidId(id)) {
      throw new BadRequestException('Id is not valid');
    }
    const plane = await this.service.getPlaneById(id);
    if (!plane) {
      throw new NotFoundException('Plane not found');
    }
    return plane;
  }

  private isValidId(id?: string) {
    return id && !isUUID(id);
  }
}
