import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerRepository } from './scheduler.repository';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchedulerRepository])],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
