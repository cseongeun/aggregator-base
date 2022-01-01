import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';

@Injectable()
export class ContractService {
  constructor(public readonly repository: ContractRepository) {}
}
