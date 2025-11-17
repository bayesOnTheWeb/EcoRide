import { IsString } from "class-validator";

export class SelectRideDto{
    @IsString()
    id : string
}