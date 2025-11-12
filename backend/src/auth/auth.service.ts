import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService : JwtService,
  ) {}

  async createUser(user: CreateUserDto) {

    try {
    const hashedPassword = await bcrypt.hash(user.password , 10)
    const newUser = {...user , password: hashedPassword}
    const savedUser = this.userRepository.create(newUser)
    await this.userRepository.save(savedUser) 
    } catch (error) {
        throw new UnauthorizedException();
    }

  }

async connect(user: ConnectUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (!existingUser) {
      throw new UnauthorizedException('Utilisateur non trouvé'); // ← message spécifique
    }

    const isMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mot de passe incorrect'); // ← message spécifique
    }

    const payload = { userId: existingUser.id, role: existingUser.isAdmin };
    const token = this.jwtService.sign(payload);

    const safeUser = { email: existingUser.email, token };

    console.log('Token créé avec succès :', safeUser);

    return safeUser; // tu peux retourner l'objet complet si tu veux l'envoyer au frontend
  }
}
