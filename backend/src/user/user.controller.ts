import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    const userId = req.user.userId;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'firstname', 'lastname', 'email'],
    });

    console.log(user , userId)
    if (!user) {
      throw new NotFoundException();
    }
    return {sucess : true , user};
  }
}
