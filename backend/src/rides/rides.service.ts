import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { Ride } from './entities/ride.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectRideDto } from './dto/select-ride.dto';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    readonly rideRepository : Repository<Ride> 
  ){}
  async create(createRideDto: CreateRideDto) {
    const newRide = this.rideRepository.create(createRideDto)
    return await this.rideRepository.save(newRide) ;
  }

  async findAll() {
    return this.rideRepository.find();
  }

  async findOne(selectedRide: SelectRideDto) {
    return this.rideRepository.findOne({where : {id : selectedRide.id}});
  }
}
