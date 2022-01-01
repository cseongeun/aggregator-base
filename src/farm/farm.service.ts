import { Injectable } from '@nestjs/common';
import { FarmRepository } from './farm.repository';

@Injectable()
export class FarmService {
  constructor(public readonly repository: FarmRepository) {}
}
