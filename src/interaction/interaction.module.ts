import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteractionRepository } from './interaction.repository';
import { InteractionService } from './interaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([InteractionRepository])],
  providers: [InteractionService],
  exports: [InteractionService],
})
export class InteractionModule {}
