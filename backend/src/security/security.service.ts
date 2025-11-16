import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SecurityService {
  constructor(private jwtService: JwtService) {}

  async createToken(user: User) {
    const payload = { userId: user.id };
    const token = await this.jwtService.signAsync(payload)
    return {token}
  }

  async hashPassword(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return hashedPassword;
  }

  async comparePassword(user: ConnectUserDto, hash: string) {
    const isMatch = await bcrypt.compare(user.password, hash);
    return isMatch;
  }
}
