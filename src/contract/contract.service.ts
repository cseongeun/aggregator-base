import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';

@Injectable()
export class ContractService {
  constructor(public repository: ContractRepository) {}
}
