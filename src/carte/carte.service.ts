import { Injectable } from '@nestjs/common';
import { CreateCarteDto } from './dto/create-carte.dto';
import { UpdateCarteDto } from './dto/update-carte.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarteService {
  constructor(private prisma: PrismaService) {}

  create(createCarteDto: CreateCarteDto) {
    try {
      const carte = this.prisma.cartes.create({
        data: {
          ...createCarteDto,
        },
      });
      return carte;
    } catch (error) {
      return error;
    }
  }

  update(idCarte: string, updateCarteDto: UpdateCarteDto) {
    try {
      const carte = this.prisma.cartes.update({
        where: {
          idCarte: idCarte,
        },
        data: {
          ...updateCarteDto,
        },
      });
      return carte;
    } catch (error) {
      return error;
    }
  }

  remove(idCarte: string) {
    try {
      const carte = this.prisma.cartes.delete({
        where: {
          idCarte: idCarte,
        },
      });
      return carte;
    } catch (error) {
      return error;
    }
  }
}
