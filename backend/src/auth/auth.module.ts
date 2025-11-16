import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { SecurityService } from 'src/security/security.service';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    SecurityModule,
    JwtModule.register({
      secret: process.env.SECRET || 'supersecret123',
      signOptions: { expiresIn: '30min' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
