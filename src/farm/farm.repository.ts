import { EntityRepository, EntityTarget } from 'typeorm';
import { Farm } from './farm.entity';
import { RepositoryBase } from '../extension/repository.base';

@EntityRepository(Farm)
export class FarmRepository extends RepositoryBase<Farm> {
  entity: EntityTarget<Farm> = Farm;
  relations: string[] = Farm.relations;
  recursiveRelations: string[] = Farm.recursiveRelations;
  select: string[] = Farm.select;
}
