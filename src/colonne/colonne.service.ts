import { Injectable } from '@nestjs/common';
import { CreateColonneDto } from './dto/create-colonne.dto';
import { UpdateColonneDto } from './dto/update-colonne.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ColonneService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(createColonneDto: CreateColonneDto, userId: string) {
    // try catch to create a colonne with the userId 

    try {
      createColonneDto.userIdFk = userId;
      const colonne = this.prisma.colonne.create({
        data: {
          ...createColonneDto,
        },
      });
      return colonne;
    } catch (error) {
      return error;
    }


  
  }


  findOne(idUser: string, idColonne: string) {
    try {
      const colonne = this.prisma.colonne.findMany({
        where: {
          idColonne: idColonne,
          userIdFk: idUser,
        },
        include: {
          cartes: true,
        },
      });
      return colonne;
    } catch (error) {
      return error;
    }
  }

  findAll(userId: string) {
    try {
      const colonnes = this.prisma.colonne.findMany({
        where: {
          userIdFk: userId,
        },
        include: {
          cartes: true,
        },
      });
      return colonnes;
    } catch (error) {
      return error;
    }
  }


  update(idColonne: string, updateColonneDto: UpdateColonneDto) {
    try {
      const colonne = this.prisma.colonne.update({
        where: {
          idColonne: idColonne,
        },
        data: {
          ...updateColonneDto,
        },
      });
      return colonne;
    } catch (error) {
      return error;
    }
  }

  remove(idColonne: string) {
    try {
      const colonne = this.prisma.colonne.delete({
        where: {
          idColonne: idColonne,
        },
      });
      return colonne;
    }
    catch (error) {
      return error;
    }
  }
}
