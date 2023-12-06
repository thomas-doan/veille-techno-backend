import { SetMetadata } from '@nestjs/common';
import { Role } from '../../auth/_enum/role.enum';

export const Public = () => SetMetadata('isPublic', true);

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);

