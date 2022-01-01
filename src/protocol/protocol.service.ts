import { Injectable } from '@nestjs/common';
import { ProtocolRepository } from './protocol.repository';

@Injectable()
export class ProtocolService {
  constructor(public readonly repository: ProtocolRepository) {}
}
