import { Injectable } from '@nestjs/common';
import { SchedulerRepository } from './scheduler.repository';

@Injectable()
export class SchedulerService {
  constructor(public readonly repository: SchedulerRepository) {}
}
