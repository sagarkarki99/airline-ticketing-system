import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UserRole } from 'src/entities/User.entity';
import { AirlinesCounterService } from './airlines-counter.service';
import { NewAirlineDto, UpdateAirlineDto } from './dtos/airline.dto';

@Controller('airlines')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Airline-resources')
export class AirlinesCounterController {
  constructor(private airlinesCounterService: AirlinesCounterService) {}

  @Post('/')
  @Roles(UserRole.admin)
  async createNew(@Body() body: NewAirlineDto) {
    console.log(body);

    const line = await this.airlinesCounterService.addNew(body.name);
    return 'Airline added successfully.';
  }

  @Get('/')
  @Roles(UserRole.admin)
  getAllAirlines() {
    return this.airlinesCounterService.getAllAirlines();
  }

  @Get('/:id')
  @Roles(UserRole.admin)
  async getAirline(@Param('id') id: string) {
    const airline = await this.airlinesCounterService.getAirlineDetail(id);
    return airline;
  }

  @Post(':id/addMorePlanes')
  @Roles(UserRole.admin)
  addAirplaneFor(@Param('id') id: string, @Body() airplanes: number) {}

  @Patch('/:id')
  @Roles(UserRole.admin)
  updateAirplane(@Param('id') id: string, @Body() body: UpdateAirlineDto) {
    return this.airlinesCounterService.update(id, body);
  }
}
