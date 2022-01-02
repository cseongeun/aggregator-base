import { EntityRepository, EntityTarget } from 'typeorm';
import { RepositoryBase } from '../repository.base';
import { Scheduler } from './scheduler.entity';

@EntityRepository(Scheduler)
export class SchedulerRepository extends RepositoryBase<Scheduler> {
  entity: EntityTarget<Scheduler> = Scheduler;
  relations: string[] = Scheduler.relations;
  recursiveRelations: string[] = Scheduler.recursiveRelations;
}
