import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
    imports : [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret : process.env.SECRET || 'supersecret123',
          signOptions : {expiresIn : "30min"} 
        })
    ],
    providers : [AuthService],
    exports : [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
