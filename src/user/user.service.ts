import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../auth/_enum/role.enum';
import * as argon from 'argon2';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
  ) {}

  findAll() {
    try {
      const users = this.prisma.user.findMany();
      return users;
    }
    catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(userId: string, updateUserDto: UpdateUserDto, role: Role) {
    try {
        // Vérification de l'existence de l'utilisateur et de l'unicité de l'email
        await this.validateUserAndEmail(userId, updateUserDto);

        // Hashage du mot de passe si présent
        if (updateUserDto.password) {
            updateUserDto.password = await argon.hash(updateUserDto.password);
        }

        // Préparation des données pour la mise à jour
        const updateData = this.prepareUpdateData(updateUserDto, role);

        // Mise à jour de l'utilisateur
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return updatedUser;
    } catch (error) {
        // Gestion des erreurs
        const msgError = {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        };
        console.log(error);
        return msgError;
    }
}

private async validateUserAndEmail(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    if (updateUserDto.email) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: updateUserDto.email } });
        if (existingUser && existingUser.id !== userId) {
            throw new Error(`Email ${updateUserDto.email} is already taken`);
        }
    }
}

private prepareUpdateData(updateUserDto: UpdateUserDto, role: Role) {
    // Si l'utilisateur est un admin, permettre la mise à jour de roleIdFk
    if (role === Role.ADMIN) {
        return updateUserDto;
    } else {
        // Si l'utilisateur n'est pas admin, supprimer roleIdFk du DTO
        const { roleIdFk, ...updateData } = updateUserDto;
        return updateData;
    }
}

  remove(userId: string) {
  try {
      const user = this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }

      const deletedUser = this.prisma.user.delete({ where: { id: userId } });
      return deletedUser;
    }
    catch (error) {
      const msgError = {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
      console.log(error);
      return msgError;
    
  }
  }
}
