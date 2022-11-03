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
@ApiTags('Plane-Resources')
export class PlaneCounterController {
  constructor(private readonly service: PlaneCounterService) {}

  @Post('/')
  @Roles(UserRole.admin)
  addNew(@Body() body: NewPlaneDto) {
    return this.service.add(body);
  }

  @Get('/')
  getPlanesBy(@Query('airlineId') airlineId?: string) {
    return this.service.getPlanesBy(airlineId);
  }

  @Get('/:id')
  async getPlaneDetail(@Param('id') id: string) {
    return this.service.getPlaneById(id);
  }
}
