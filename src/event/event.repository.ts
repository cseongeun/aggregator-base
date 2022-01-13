import { EntityRepository, EntityTarget } from 'typeorm';
import { Event } from './event.entity';
import { RepositoryBase } from '../extension/repository.base';

@EntityRepository(Event)
export class EventRepository extends RepositoryBase<Event> {
  entity: EntityTarget<Event> = Event;
  relations: string[] = Event.relations;
  recursiveRelations: string[] = Event.recursiveRelations;
  select: string[] = Event.select;
}
