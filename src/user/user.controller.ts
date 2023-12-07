import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AtGuard } from '../shared/guards/at.guard';
import { GetCurrentUserId, HasRoles, getCurrentRole } from '../shared/decorators';
import { Role } from '../auth/_enum/role.enum';
import { RolesGuard } from '../shared/guards';

@UseGuards(AtGuard, RolesGuard)
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @HasRoles(Role.ADMIN)
  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @HasRoles(Role.USER)
  @Get('users/auth')
  findOne(@GetCurrentUserId() userId: string) {
   // return this.userService.findOne(+id);
   return `This action returns a #${userId} user`;
  }

  @HasRoles(Role.USER)
  @Patch('users')
  update(@Body() updateUserDto: UpdateUserDto, @GetCurrentUserId() userId: string, @getCurrentRole() role: Role) {
      return this.userService.update(userId, updateUserDto, role);
  }

  @HasRoles(Role.ADMIN)
  @Patch('users/:id')
  updateAdmin(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string, @getCurrentRole() role: Role) {
      return this.userService.update(id, updateUserDto, role);
  }

  @HasRoles(Role.USER)
  @Delete('users')
  remove(@GetCurrentUserId() userId: string) {  
    return this.userService.remove(userId);
  }
}





