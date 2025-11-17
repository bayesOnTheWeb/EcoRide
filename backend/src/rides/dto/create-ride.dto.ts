import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRideDto {
    @IsString()
    @IsNotEmpty()
    arrival: string;

    @IsString()
    @IsNotEmpty()
    departure: string;

    @IsString()
    @IsNotEmpty()
    conducer: string;
}
