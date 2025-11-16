import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { SecurityModule } from 'src/security/security.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    SecurityModule,
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
