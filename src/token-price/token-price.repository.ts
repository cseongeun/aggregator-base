import { EntityRepository, EntityTarget } from 'typeorm';
import { RepositoryBase } from '../extension/repository.base';
import { TokenPrice } from './token-price.entity';

@EntityRepository(TokenPrice)
export class TokenPriceRepository extends RepositoryBase<TokenPrice> {
  entity: EntityTarget<TokenPrice> = TokenPrice;
  relations: string[] = TokenPrice.relations;
  recursiveRelations: string[] = TokenPrice.recursiveRelations;
  select: string[] = TokenPrice.select;
}
