import {
  Controller,
  Post,
  Res,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    return { message: 'Utilisateur créé', userId: createUserDto.email};
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: ConnectUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.connect(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // 🔒 sécurité prod
      maxAge: 1000 * 60 * 30, // 30 min
      path: '/', // important pour correspondre à clearCookie()
    });

    return { message: 'Connexion réussie' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { message: 'Déconnexion réussie' };
  }
}
