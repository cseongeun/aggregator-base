import { EntityRepository, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { RepositoryBase } from '../extension/repository.base';
import { Lending } from './lending.entity';

@EntityRepository(Lending)
export class LendingRepository extends RepositoryBase<Lending> {
  entity: EntityTarget<Lending> = Lending;
  relations: string[] = Lending.relations;
  recursiveRelations: string[] = Lending.recursiveRelations;
  select: string[] = Lending.select;

  // async _search(params: any): Promise<any[]> {
  //   const queryBuilder = this.createQueryBuilder('lending');

  //   this._searchQueryBuilder(queryBuilder, params);

  //   if (params.skipItems) {
  //     queryBuilder.offset(params.skipItems);
  //   }

  //   if (params.limit) {
  //     queryBuilder.limit(params.limit);
  //   }

  //   queryBuilder.select(Lending.select);

  //   const result = await queryBuilder.disableEscaping().getMany();
  //   return result;
  // }

  // async _searchDistinct(params: any, distinct: string): Promise<string[]> {
  //   const queryBuilder = this.createQueryBuilder('lending');

  //   this._searchQueryBuilder(queryBuilder, params);

  //   queryBuilder.distinct(true).select(distinct);

  //   const result = await queryBuilder.getRawMany();

  //   return result.map((r) => r[distinct.replace('.', '_')]);
  // }

  // _searchQueryBuilder(
  //   queryBuilder: SelectQueryBuilder<Lending>,
  //   params: any,
  // ): SelectQueryBuilder<Lending> {
  //   Lending.relations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(`lending.${relation}`, relation);
  //   });

  //   Lending.recursiveRelations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
  //   });

  //   queryBuilder.andWhere('protocol.status = true');
  //   queryBuilder.andWhere('lending.status = true');

  //   if (params.id) {
  //     queryBuilder.andWhere('lending.id = :id', { id: params.id });
  //   }

  //   if (params.ids) {
  //     queryBuilder.andWhere('lending.id in (:ids)', { ids: params.ids });
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
  //     queryBuilder.andWhere('lending.address = :address', {
  //       address: params.address,
  //     });
  //   }

  //   if (params.address) {
  //     queryBuilder.andWhere('lending.address in (:addresses)', {
  //       addresses: params.addresses,
  //     });
  //   }

  //   return queryBuilder;
  // }
}
