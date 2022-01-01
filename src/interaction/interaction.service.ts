import { Injectable } from '@nestjs/common';
import { InteractionRepository } from './interaction.repository';

@Injectable()
export class InteractionService {
  constructor(public readonly repository: InteractionRepository) {}
}
