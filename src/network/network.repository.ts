import { EntityRepository, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { RepositoryBase } from '../extension/repository.base';
import { Network } from './network.entity';

@EntityRepository(Network)
export class NetworkRepository extends RepositoryBase<Network> {
  entity: EntityTarget<Network> = Network;
  relations: string[] = Network.relations;
  recursiveRelations: string[] = Network.recursiveRelations;
  select: string[] = Network.select;

  // async _search(params: any): Promise<any[]> {
  //   const queryBuilder = this.createQueryBuilder('network');

  //   this._searchQueryBuilder(queryBuilder, params);

  //   if (params.skipItems) {
  //     queryBuilder.offset(params.skipItems);
  //   }

  //   if (params.limit) {
  //     queryBuilder.limit(params.limit);
  //   }

  //   queryBuilder.select(Network.select);

  //   const result = await queryBuilder.disableEscaping().getMany();
  //   return result;
  // }

  // private _searchQueryBuilder(
  //   queryBuilder: SelectQueryBuilder<Network>,
  //   params: any,
  // ): SelectQueryBuilder<Network> {
  //   Network.relations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(`network.${relation}`, relation);
  //   });

  //   Network.recursiveRelations.forEach((relation: string) => {
  //     queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
  //   });

  //   queryBuilder.andWhere('network.status = true');

  //   if (params.id) {
  //     queryBuilder.andWhere('network.id = :id', { id: params.id });
  //   }

  //   return queryBuilder;
  // }
}
