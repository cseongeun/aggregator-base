import { EntityRepository, EntityTarget } from 'typeorm';
import { RepositoryBase } from '../extension/repository.base';
import { TaskStream } from './task-stream.entity';

@EntityRepository(TaskStream)
export class TaskStreamRepository extends RepositoryBase<TaskStream> {
  entity: EntityTarget<TaskStream> = TaskStream;
  relations: string[] = TaskStream.relations;
  recursiveRelations: string[] = TaskStream.recursiveRelations;
  select: string[] = TaskStream.select;
}
