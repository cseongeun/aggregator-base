import { EntityRepository, EntityTarget } from 'typeorm';
import { Contract } from './contract.entity';
import { RepositoryBase } from '../extension/repository.base';

@EntityRepository(Contract)
export class ContractRepository extends RepositoryBase<Contract> {
  entity: EntityTarget<Contract> = Contract;
  relations: string[] = Contract.relations;
  recursiveRelations: string[] = Contract.recursiveRelations;
  select: string[] = Contract.select;
}
