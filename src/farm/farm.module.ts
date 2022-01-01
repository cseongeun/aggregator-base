import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmService } from './farm.service';

@Module({
  imports: [TypeOrmModule.forFeature([FarmService])],
  providers: [FarmService],
  exports: [FarmService],
})
export class FarmModule {}
