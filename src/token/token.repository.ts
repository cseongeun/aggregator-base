import { EntityRepository, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { RepositoryBase } from '../extension/repository.base';
import { Token } from './token.entity';

@EntityRepository(Token)
export class TokenRepository extends RepositoryBase<Token> {
  entity: EntityTarget<Token> = Token;
  relations: string[] = Token.relations;
  recursiveRelations: string[] = Token.recursiveRelations;
  select: string[] = Token.select;

  // async _search(params: any): Promise<Token[]> {
  //   const queryBuilder = this.createQueryBuilder('token');

  //   this._searchQueryBuilder(queryBuilder, params);

  //   if (params.skipItems) {
  //     queryBuilder.offset(params.skipItems);
  //   }

  //   if (params.limit) {
  //     queryBuilder.limit(params.limit);
  //   }

  //   queryBuilder.select(Token.select);

  //   const result = await queryBuilder.disableEscaping().getMany();
  //   return result;
  // }

  // async _searchDistinct(params: any, distinct: string): Promise<string[]> {
  //   const queryBuilder = this.createQueryBuilder('token');

  //   this._searchQueryBuilder(queryBuilder, params);

  //   queryBuilder.distinct(true).select(distinct);

  //   const result = await queryBuilder.getRawMany();

  //   return result.map((r) => r[distinct.replace('.', '_')]);
  // }

  // private _searchQueryBuilder(
  //   queryBuilder: SelectQueryBuilder<Token>,
  //   params: any,
  // ): SelectQueryBuilder<Token> {
  //   Token.relations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(`token.${relation}`, relation);
  //   });

  //   Token.recursiveRelations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
  //   });

  //   queryBuilder.andWhere('network.status = true');
  //   queryBuilder.andWhere('token.status = true');

  //   if (params.id) {
  //     queryBuilder.andWhere('token.id = :id', { id: params.id });
  //   }

  //   if (params.address) {
  //     queryBuilder.andWhere('token.address = :address', {
  //       address: params.address,
  //     });
  //   }

  //   if (params.type) {
  //     queryBuilder.andWhere('token.type = :type', {
  //       type: params.type,
  //     });
  //   }

  //   if (params.types) {
  //     queryBuilder.andWhere('token.types in (:types)', {
  //       types: params.types,
  //     });
  //   }

  //   if (params.addresses) {
  //     queryBuilder.andWhere('token.address in (:addresses)', {
  //       addresses: params.addresses,
  //     });
  //   }

  //   if (params.symbol) {
  //     queryBuilder.andWhere('token.symbol = :symbol', {
  //       symbol: params.symbol,
  //     });
  //   }

  //   if (params.chainId) {
  //     queryBuilder.andWhere('network.chainId = :chainId', {
  //       chainId: params.chainId,
  //     });
  //   }

  //   return queryBuilder;
  // }
}
