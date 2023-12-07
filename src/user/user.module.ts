import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthModule, SharedModule],
  imports: [AuthModule, SharedModule]
})
export class UserModule {}
