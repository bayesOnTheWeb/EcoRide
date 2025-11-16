import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { handleRetry, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import { SecurityService } from 'src/security/security.service';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private securityservice: SecurityService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    try {
      const isExist = await this.userRepository.findOne({where : {email : user.email}})
      if(isExist){
        return {sucess : false, message : "email déjà utilisé."}
      }
      const hash = await this.securityservice.hashPassword(user);
      const newUser = { ...user, password: hash };
      const savedUser = this.userRepository.create(newUser);
      await this.userRepository.save(savedUser);
      return {success : true , message : "utilisateur créé avec sucess" , email : user.email}
    } catch (error) {
      throw new ConflictException();
    }
  }

  async connect(user: ConnectUserDto) {
    //vérifier l'existance de l'email en base
    // vérifier la correspondance des mots de passes entre la soumission et celui stocké en base
    //si pass , création du token de connexion

    try {
      const isEmailExist = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!isEmailExist) {
        throw new InternalServerErrorException();
      }

      const isPasswordValid = await this.securityservice.comparePassword(
        user,
        isEmailExist.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException();
      }

      const newToken = await this.securityservice.createToken(isEmailExist);
      console.log(newToken);
      return { success: true, message: 'utilisateur authentifié avec succès' , newToken };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
