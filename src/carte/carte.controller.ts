import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarteService } from './carte.service';
import { CreateCarteDto } from './dto/create-carte.dto';
import { UpdateCarteDto } from './dto/update-carte.dto';
import { RolesGuard } from '../shared/guards';
import { AtGuard } from '../shared/guards/at.guard';
import { Role } from '../auth/_enum/role.enum';
import { HasRoles } from '../shared/decorators';


@UseGuards(AtGuard, RolesGuard)
@Controller('api')
export class CarteController {
  constructor(private readonly carteService: CarteService) {}

  @HasRoles(Role.USER)
  @Post('cartes')
  create(@Body() createCarteDto: CreateCarteDto) {
    return this.carteService.create(createCarteDto);
  }

  @Patch(':idCarte')
  update(@Param('idCarte') idCarte: string, @Body() updateCarteDto: UpdateCarteDto) {
    return this.carteService.update(idCarte, updateCarteDto);
  }

  @Delete(':idCarte')
  remove(@Param('idCarte') idCarte: string) {
    return this.carteService.remove(idCarte);
  }
}
