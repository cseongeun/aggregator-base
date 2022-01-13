import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(public readonly repository: EventRepository) {}
}
