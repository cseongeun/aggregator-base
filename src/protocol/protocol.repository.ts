import {
  EntityManager,
  EntityRepository,
  EntityTarget,
  FindManyOptions,
  FindOperator,
  Repository,
  SelectQueryBuilder,
  TransactionManager,
} from 'typeorm';
import { RepositoryBase } from '../repository.base';
import { Protocol } from './protocol.entity';

@EntityRepository(Protocol)
export class ProtocolRepository extends RepositoryBase<Protocol> {
  entity: EntityTarget<Protocol> = Protocol;
  relations: string[] = Protocol.relations;
  recursiveRelations: string[] = Protocol.recursiveRelations;

  /**
   * 조회
   * @param params protocolSearchQuery
   * @returns Farm entities & total number
   */
  async _search(params: any): Promise<any[]> {
    const queryBuilder = this.createQueryBuilder('protocol');

    this._searchQueryBuilder(queryBuilder, params);

    if (params.skipItems) {
      queryBuilder.offset(params.skipItems);
    }

    if (params.limit) {
      queryBuilder.limit(params.limit);
    }

    queryBuilder.select(Protocol.select);

    const result = await queryBuilder.disableEscaping().getMany();
    return result;
  }

  /**
   * 유니크 컬럼
   * @param params farm search query params
   * @param distinct column
   * @returns
   */
  async _searchDistinct(params: any, distinct: string): Promise<string[]> {
    const queryBuilder = this.createQueryBuilder('protocol');
    this._searchQueryBuilder(queryBuilder, params);

    queryBuilder.distinct(true).select(distinct);

    const result = await queryBuilder.getRawMany();
    return result.map((r) => r[distinct.replace('.', '_')]);
  }

  /**
   * 조회 쿼리 빌더 만들기
   * @param queryBuilder queryBuilder
   * @param params
   * @returns
   */
  private _searchQueryBuilder(
    queryBuilder: SelectQueryBuilder<Protocol>,
    params: any,
  ): SelectQueryBuilder<Protocol> {
    // relations
    Protocol.relations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(`protocol.${relation}`, relation);
    });

    // recursive relations
    Protocol.recursiveRelations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
    });

    queryBuilder.andWhere('protocol.status = true');
    queryBuilder.andWhere('network.status = true');

    if (params.id) {
      queryBuilder.andWhere('protocol.id = :id', { id: params.id });
    }

    if (params.ids) {
      queryBuilder.andWhere('protocol.id in (:ids)', {
        ids: params.ids,
      });
    }

    if (params.useDEX) {
      queryBuilder.andWhere('protocol.useDex = :useDEX', {
        useDEX: params.useDEX,
      });
    }

    if (params.useFarm) {
      queryBuilder.andWhere('protocol.useFarm = :useFarm', {
        useFarm: params.useFarm,
      });
    }

    if (params.useLending) {
      queryBuilder.andWhere('protocol.useLending = :useLending', {
        useLending: params.useLending,
      });
    }

    if (params.useNFT) {
      queryBuilder.andWhere('protocol.useNFT = :useNFT', {
        useNFT: params.useNFT,
      });
    }

    return queryBuilder;
  }
}
