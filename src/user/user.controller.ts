import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AtGuard } from '../shared/guards/at.guard';
import {
  GetCurrentUserId,
  HasRoles,
  getCurrentRole,
} from '../shared/decorators';
import { Role } from '../auth/_enum/role.enum';
import { RolesGuard } from '../shared/guards';

import { Application, State, HateoasLink } from '../shared/interfaces';

@UseGuards(AtGuard, RolesGuard)
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  createUserHateoasLinks(
    userId: string | null,
    currentUserRole: Role,
  ): HateoasLink[] {
    let links: HateoasLink[] = [];

    if (currentUserRole === Role.USER) {
      // L'utilisateur peut voir ses propres informations
      links.push({
        rel: 'self',
        href: `/api/users/auth`,
        type: 'GET',
      });

      // L'utilisateur peut mettre à jour ses propres informations
      links.push({
        rel: 'update-self',
        href: `/api/users`,
        type: 'PATCH',
      });

      // L'utilisateur peut se supprimer
      links.push({
        rel: 'delete-self',
        href: `/api/users`,
        type: 'DELETE',
      });
    }

    if (currentUserRole === Role.ADMIN) {
      // Ajoutez des liens spécifiques pour les administrateurs
      links.push(
        {
          rel: 'all-users',
          href: '/api/users',
          type: 'GET',
        },
        {
          rel: 'update-any',
          href: `/api/users/${userId ? userId : ':id'}`,
          type: 'PATCH',
        },
      );
    }

    return links;
  }

  applicationInfo(state: State): Application {
    const application: Application = {
      name: 'Kanban Api Back',
      version: '1.0',
      authority: 'localhost:3333',
      state: state,
    };

    return application;
  }

  @HasRoles(Role.ADMIN)
  @Get('users')
  async findAll(@getCurrentRole() role: Role) {
    const users = await this.userService.findAll();
    const usersWithLinks = users.map((user) => ({
      ...user,
      links: this.createUserHateoasLinks(user.id, role),
    }));
    const transitions = this.createUserHateoasLinks(null, role);
    const state: State = {
      name: 'UserList',
      type: 'collection',
      resource: '/api/users',
      transitions: transitions,
    };

    const application = this.applicationInfo(state);

    return { content: usersWithLinks, application };
  }

  @HasRoles(Role.USER)
  @Get('users/auth')
  async findOne(
    @GetCurrentUserId() userId: string,
    @getCurrentRole() role: Role,
  ) {
    const user = await this.userService.findOne(userId);
    const transitions = this.createUserHateoasLinks(userId, role);
    const state: State = {
      name: 'UserDetails',
      type: 'document',
      resource: `/api/users/auth`,
      transitions: transitions,
    };

    const application = this.applicationInfo(state);

    return { data: user, application };
  }

  @HasRoles(Role.USER)
  @Patch('users')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @GetCurrentUserId() userId: string,
    @getCurrentRole() role: Role,
  ) {
    const updatedUser = await this.userService.update(
      userId,
      updateUserDto,
      role,
    );
    const transitions = this.createUserHateoasLinks(userId, role);
    const state: State = {
      name: 'UpdateUser',
      type: 'action',
      resource: `/api/users`,
      transitions: transitions,
    };

    const application = this.applicationInfo(state);

    return { content: updatedUser, application };
  }

  @HasRoles(Role.ADMIN)
  @Patch('users/:id')
  async updateAdmin(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @getCurrentRole() role: Role,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto, role);
    const transitions = this.createUserHateoasLinks(id, role);
    const state: State = {
      name: 'UpdateAdminUser',
      type: 'action',
      resource: `/api/users/admin/${id}`,
      transitions: transitions,
    };

    const application = this.applicationInfo(state);

    return { content: updatedUser, application };
  }

  @HasRoles(Role.USER)
  @Delete('users')
  async remove(
    @GetCurrentUserId() userId: string,
    @getCurrentRole() role: Role,
  ) {
    await this.userService.remove(userId);
    const transitions = this.createUserHateoasLinks(userId, role);
    const state: State = {
      name: 'RemoveUser',
      type: 'action',
      resource: `/api/users`,
      transitions: transitions,
    };

    const application = this.applicationInfo(state);

    return { message: 'User deleted successfully', application };
  }
}
