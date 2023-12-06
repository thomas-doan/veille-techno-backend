import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser, HasRoles } from '../common/decorators';
import { AtGuard, RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './dto';
import { Tokens } from './types';
import { Role } from './_enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }


  @UseGuards(AtGuard)
  @HasRoles(Role.USER)
  @Get('test')
  test() {
    return 'ok';
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
