import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UserRole } from 'src/entities/User.entity';
import { AirportService } from './airport.service';
import { AirportResponseDto } from './dtos/airport.response.dto';
import { NewAirportDto } from './dtos/new-airport.dto';

@Controller('airport')
@UseGuards(JwtAuthGuard, RoleGuard)
export class AirportController {
  constructor(private readonly service: AirportService) {}

  @Post('')
  @Roles(UserRole.admin)
  async addAirport(
    @Body() newAirportDto: NewAirportDto,
  ): Promise<AirportResponseDto> {
    const doc = await this.service.addAirport(newAirportDto);
    return {
      id: doc.id,
      name: doc.name,
      city: doc.city,
      code: doc.code,
    };
  }
}
