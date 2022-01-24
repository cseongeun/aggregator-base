import { EntityRepository, EntityTarget } from 'typeorm';
import { RepositoryBase } from '../extension/repository.base';
import { Interaction } from './interaction.entity';

@EntityRepository(Interaction)
export class InteractionRepository extends RepositoryBase<Interaction> {
  entity: EntityTarget<Interaction> = Interaction;
  relations: string[] = Interaction.relations;
  recursiveRelations: string[] = Interaction.recursiveRelations;
  select: string[] = Interaction.select;
}
