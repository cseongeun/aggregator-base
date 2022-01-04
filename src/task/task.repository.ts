import { EntityRepository, EntityTarget } from 'typeorm';
import { RepositoryBase } from '../extension/repository.base';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends RepositoryBase<Task> {
  entity: EntityTarget<Task> = Task;
  relations: string[] = Task.relations;
  recursiveRelations: string[] = Task.recursiveRelations;
  select: string[] = Task.select;
}
