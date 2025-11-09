import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


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

  async connect(user : ConnectUserDto){

    const ExistingUser = await this.userRepository.findOne({where : {email : user.email}})
    if(!ExistingUser){
        return new InternalServerErrorException();
    }
    const isMatch = await bcrypt.compare(user.password, ExistingUser.password)
    if(!isMatch){
        return new InternalServerErrorException();
    }

    const payload = {userId : ExistingUser.id,  role : ExistingUser.isAdmin}
    const token = this.jwtService.sign(payload)


    const safeUser = {email : ExistingUser.email , token}

    console.log('Token créé avec succès : ' , safeUser)

    return token
  }
}
