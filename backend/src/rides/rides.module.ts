import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports :[TypeOrmModule.forFeature([Ride]) , JwtModule , AuthModule] ,
  controllers: [RidesController],
  providers: [RidesService],
  exports : [RidesService]
})
export class RidesModule {}
