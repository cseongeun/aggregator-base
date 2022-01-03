import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmRepository } from './farm.repository';
import { FarmService } from './farm.service';

@Module({
  imports: [TypeOrmModule.forFeature([FarmRepository])],
  providers: [FarmService],
  exports: [FarmService],
})
export class FarmModule {}
