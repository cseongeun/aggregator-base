import { Injectable } from '@nestjs/common';
import { TaskStreamRepository } from './task-stream.repository';

@Injectable()
export class TaskStreamService {
  constructor(public readonly repository: TaskStreamRepository) {}
}
