import { Injectable } from '@nestjs/common';
import { TokenPriceRepository } from './token-price.repository';

@Injectable()
export class TokenPriceService {
  constructor(public readonly repository: TokenPriceRepository) {}
}
