import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || 'myjwtsecret' }),
  ],
  providers: [SecurityService],
  exports: [SecurityService , JwtModule],
})
export class SecurityModule {}
