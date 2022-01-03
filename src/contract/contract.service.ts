import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContractRepository } from './contract.repository';

@Injectable()
export class ContractService {
  constructor(public repository: ContractRepository) {}
}
