import { Injectable } from '@nestjs/common';
import { FarmRepository } from './farm.repository.r';

@Injectable()
export class FarmService {
  constructor(public readonly repository: FarmRepository) {}
}
