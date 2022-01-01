import { Injectable } from '@nestjs/common';
import { NFTokenRepository } from './nf-token.repository';

@Injectable()
export class NFTokenService {
  constructor(public readonly repository: NFTokenRepository) {}
}
