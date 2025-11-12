import { IsEmail, IsString } from 'class-validator';

export class ConnectUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
