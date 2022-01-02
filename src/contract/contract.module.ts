import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractRepository } from './contract.repository.r';
import { ContractService } from './contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContractRepository])],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}