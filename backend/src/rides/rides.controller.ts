import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, Req, UseGuards } from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService,
  ) {}

  @Post('createRide')
  @UseGuards(AuthGuard)
  async createRide(@Body() createRideDto : CreateRideDto){
    try {

      const newRide =  await this.ridesService.create(createRideDto)
      console.log(newRide)
      return {sucess : true, message : "création de la course réussie" , ride : newRide}
    } catch (error) {
      throw new InternalServerErrorException
    }
  }

  @Get('allRides')
  @UseGuards(AuthGuard)
  async findAll(){
    return this.ridesService.findAll()
  }

}

