import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkRepository } from './network.repository';
import { NetworkService } from './network.service';

@Module({
  imports: [TypeOrmModule.forFeature([NetworkRepository])],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
