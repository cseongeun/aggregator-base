import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LendingRepository } from './lending.repository';
import { LendingService } from './lending.service';

@Module({
  imports: [TypeOrmModule.forFeature([LendingRepository])],
  providers: [LendingService],
  exports: [LendingService],
})
export class LendingModule {}
