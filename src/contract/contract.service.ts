import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository.r';

@Injectable()
export class ContractService {
  constructor(public readonly repository: ContractRepository) {}
}
