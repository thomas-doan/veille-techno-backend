import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { Role } from '../../auth/_enum/role.enum';
import { JwtPayloadWithRt } from 'src/auth/types';

export const Public = () => SetMetadata('isPublic', true);

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);

export const getCurrentRole = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.roles;
  },
);
