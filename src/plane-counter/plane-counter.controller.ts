import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { Roles } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UserRole } from 'src/entities/User.entity';
import { NewPlaneDto } from './dtos/new-plane.dto';
import { PlaneCounterService } from './plane-counter.service';

@Controller('planes')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('plane-resources')
export class PlaneCounterController {
  constructor(private readonly service: PlaneCounterService) {}

  @Post('/')
  @Roles(UserRole.admin)
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
  async getPlaneDetail(@Param('id') id: string) {
    if (this.isValidId(id)) {
      throw new BadRequestException('Id is not valid');
    }
    return this.service.getPlaneById(id);
  }

  private isValidId(id?: string) {
    return id && !isUUID(id);
  }
}
