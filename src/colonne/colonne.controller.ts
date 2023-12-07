import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ColonneService } from './colonne.service';
import { CreateColonneDto } from './dto/create-colonne.dto';
import { UpdateColonneDto } from './dto/update-colonne.dto';
import { RolesGuard } from '../shared/guards';
import { AtGuard } from '../shared/guards/at.guard';
import { Role } from '../auth/_enum/role.enum';
import { GetCurrentUserId, HasRoles } from '../shared/decorators';
import { ApiProperty } from '@nestjs/swagger';


@UseGuards(AtGuard, RolesGuard)
@Controller('api')
export class ColonneController {
  constructor(private readonly colonneService: ColonneService) {}


  @HasRoles(Role.USER)
  @Post('colonnes')
  create(@Body() createColonneDto: CreateColonneDto, @GetCurrentUserId() userId: string) {
    return this.colonneService.create(createColonneDto, userId);
  }

  @HasRoles(Role.USER)
  @Get('colonnes')
  findAll(@GetCurrentUserId() userId: string) {
    return this.colonneService.findAll(userId);
  }

  @HasRoles(Role.USER)
  @Get('colonnes/:idColonne')
  findOne(@Param('idColonne') idColonne: string, @GetCurrentUserId() userId: string) {
    return this.colonneService.findOne(userId, idColonne);
  }

  @ApiProperty()
  @HasRoles(Role.USER)
  @Patch('colonnes/:idColonne')
  update(@Param('idColonne') idColonne: string, @Body() updateColonneDto: UpdateColonneDto) {
    return this.colonneService.update(idColonne, updateColonneDto);
  }

  @HasRoles(Role.USER)
  @Delete('colonnes/:idColonne')
  remove(@Param('idColonne') idColonne: string) {
    return this.colonneService.remove(idColonne);
  }
}
