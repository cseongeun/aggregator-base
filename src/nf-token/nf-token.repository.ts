import { EntityRepository, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { RepositoryBase } from '../repository.base';
import { NFToken } from './nf-token.entity';

@EntityRepository(NFToken)
export class NFTokenRepository extends RepositoryBase<NFToken> {
  entity: EntityTarget<NFToken> = NFToken;
  relations: string[] = NFToken.relations;
  recursiveRelations: string[] = NFToken.recursiveRelations;
  select: string[] = NFToken.select;

  // async _search(params: any): Promise<any[]> {
  //   const queryBuilder = this.createQueryBuilder('nfToken');

  //   this._searchQueryBuilder(queryBuilder, params);

  //   if (params.skipItems) {
  //     queryBuilder.offset(params.skipItems);
  //   }

  //   if (params.limit) {
  //     queryBuilder.limit(params.limit);
  //   }

  //   queryBuilder.select(NFToken.select);

  //   const result = await queryBuilder.disableEscaping().getMany();
  //   return result;
  // }

  // /**
  //  * 유니트 컬럼
  //  * @param params nftoken search query params
  //  * @param distinct column
  //  * @returns
  //  */
  // async _searchDistinct(params: any, distinct: string): Promise<string[]> {
  //   const queryBuilder = this.createQueryBuilder('nfToken');

  //   this._searchQueryBuilder(queryBuilder, params);

  //   queryBuilder.distinct(true).select(distinct);

  //   const result = await queryBuilder.getRawMany();

  //   return result.map((r) => r[distinct.replace('.', '_')]);
  // }

  // private _searchQueryBuilder(
  //   queryBuilder: SelectQueryBuilder<NFToken>,
  //   params: any,
  // ): SelectQueryBuilder<NFToken> {
  //   NFToken.relations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(`nfToken.${relation}`, relation);
  //   });

  //   NFToken.recursiveRelations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
  //   });

  //   queryBuilder.andWhere('protocol_network.status = true');
  //   queryBuilder.andWhere('protocol.status = true');
  //   queryBuilder.andWhere('nfToken.status = true');

  //   if (params.id) {
  //     queryBuilder.andWhere('nfToken.id = :id', { id: params.id });
  //   }

  //   if (params.protocolId) {
  //     queryBuilder.andWhere('protocol.id = :protocolId', {
  //       protocolId: params.protocolId,
  //     });
  //   }

  //   if (params.chainId) {
  //     queryBuilder.andWhere('protocol_network.chainId = :chainId', {
  //       chainId: params.chainId,
  //     });
  //   }

  //   if (params.address) {
  //     queryBuilder.andWhere('nfToken.address = :address', {
  //       address: params.address,
  //     });
  //   }

  //   if (params.addresses && params.addresses.length > 0) {
  //     queryBuilder.andWhere('nfToken.address in (:addresses)', {
  //       addresses: params.addresses,
  //     });
  //   }

  //   if (params.index) {
  //     queryBuilder.andWhere('nfToken.index = :index', { index: params.index });
  //   }

  //   if (params.indexes && params.indexes.length > 0) {
  //     console.log('herer');

  //     queryBuilder.andWhere('nfToken.index in (:indexes)', {
  //       indexes: params.indexes,
  //     });
  //   }

  //   return queryBuilder;
  // }
}
