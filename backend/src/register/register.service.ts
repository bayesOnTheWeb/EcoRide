import { 
  ConflictException, 
  Injectable, 
  InternalServerErrorException, 
  NotFoundException 
} from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterService {

  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
  ) {}

  /** CREATE */
  async create(createRegisterDto: CreateRegisterDto) {
    try {
      // Vérifier l’existence
      const existingUser = await this.registerRepository.findOne({
        where: { email: createRegisterDto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email déjà utilisé');
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(createRegisterDto.password, 10);

      // Préparation de l’entité
      const newUser = this.registerRepository.create({
        ...createRegisterDto,
        password: hashedPassword,
      });

      // Sauvegarde
      await this.registerRepository.save(newUser);

      return {
        statusCode: 201,
        message: 'Utilisateur enregistré avec succès',
        email: newUser.email,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Impossible de créer l’utilisateur');
    }
  }

  /** FIND ALL */
  async findAll() {
    try {
      return await this.registerRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Impossible de récupérer les utilisateurs');
    }
  }

  /** FIND ONE */
  async findOne(id: string) {
    const user = await this.registerRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur #${id} non trouvé`);
    }
    return user;
  }

  /** UPDATE */
  async update(id: string, updateRegisterDto: UpdateRegisterDto) {
    try {
      const user = await this.registerRepository.findOne({ where: { id} });
      if (!user) {
        throw new NotFoundException(`Utilisateur #${id} non trouvé`);
      }

      // Si le mot de passe est mis à jour, le hasher
      if (updateRegisterDto.password) {
        updateRegisterDto.password = await bcrypt.hash(updateRegisterDto.password, 10);
      }

      // Merge les nouvelles valeurs et sauvegarde
      this.registerRepository.merge(user, updateRegisterDto);
      await this.registerRepository.save(user);

      return {
        statusCode: 200,
        message: `Utilisateur #${id} mis à jour`,
        user,
      };
    } catch (error) {
      throw new InternalServerErrorException('Impossible de mettre à jour l’utilisateur');
    }
  }

  /** REMOVE */
  async remove(id: number) {
    const result = await this.registerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Utilisateur #${id} non trouvé`);
    }
    return {
      statusCode: 200,
      message: `Utilisateur #${id} supprimé avec succès`,
    };
  }
}
