import { Injectable } from '@nestjs/common';
import { LendingRepository } from './lending.repository';

@Injectable()
export class LendingService {
  constructor(public readonly repository: LendingRepository) {}
}
