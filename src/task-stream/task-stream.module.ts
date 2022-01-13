import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStreamRepository } from './task-stream.repository';
import { TaskStreamService } from './task-stream.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStreamRepository])],
  providers: [TaskStreamService],
  exports: [TaskStreamService],
})
export class TaskStreamModule {}
