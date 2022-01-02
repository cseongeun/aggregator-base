import { EntityRepository, SelectQueryBuilder, EntityTarget } from 'typeorm';
import { RepositoryBase } from '../repository.base';
import { Farm } from './farm.entity';

@EntityRepository(Farm)
export class FarmRepository extends RepositoryBase<Farm> {
  entity: EntityTarget<Farm> = Farm;
  relations: string[] = Farm.relations;
  recursiveRelations: string[] = Farm.recursiveRelations;

  async _search(params: any): Promise<any[]> {
    const queryBuilder = this.createQueryBuilder('farm');

    this._searchQueryBuilder(queryBuilder, params);

    if (params.skipItems) {
      queryBuilder.offset(params.skipItems);
    }

    if (params.limit) {
      queryBuilder.limit(params.limit);
    }

    queryBuilder.select(Farm.select);

    const result = await queryBuilder.disableEscaping().getMany();
    return result;
  }

  async _searchDistinct(params: any, distinct: string): Promise<any[]> {
    const queryBuilder = this.createQueryBuilder('farm');

    this._searchQueryBuilder(queryBuilder, params);

    queryBuilder.distinct(true).select(distinct);

    const result = await queryBuilder.getRawMany();

    return result.map((r) => r[distinct.replace('.', '_')]);
  }

  _searchQueryBuilder(
    queryBuilder: SelectQueryBuilder<Farm>,
    params: any,
  ): SelectQueryBuilder<Farm> {
    // relations
    Farm.relations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(`farm.${relation}`, relation);
    });

    // recursive relations
    Farm.recursiveRelations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
    });

    queryBuilder.andWhere('farm.status = true');
    queryBuilder.andWhere('protocol.status = true');
    queryBuilder.andWhere('protocol_network.status = true');
    queryBuilder.andWhere('stakeTokens.status = true');
    queryBuilder.andWhere('rewardTokens.status = true');

    if (params.id) {
      queryBuilder.andWhere('farm.id = :id', { id: params.id });
    }

    if (params.protocolId) {
      queryBuilder.andWhere('protocol.id = :protocolId', {
        protocolId: params.protocolId,
      });
    }

    if (params.chainId) {
      queryBuilder.andWhere('protocol_network.chainId = :chainId', {
        chainId: params.chainId,
      });
    }

    if (params.address) {
      queryBuilder.andWhere('farm.address = :address', {
        address: params.address,
      });
    }

    if (params.addresses) {
      queryBuilder.andWhere('farm.address in (:addresses)', {
        addresses: params.addresses,
      });
    }

    if (params.pids) {
      queryBuilder.andWhere('farm.pid in (:pids)', {
        pids: params.pids,
      });
    }

    if (params.stakeTokenType) {
      queryBuilder.andWhere('stakeTokens.type = :stakeTokenType', {
        stakeTokenType: params.stakeTokenType,
      });
    }

    if (params.rewardTokenType) {
      queryBuilder.andWhere('rewardTokens.type = :rewardTokenType', {
        rewardTokenType: params.rewardTokenType,
      });
    }

    if (params.stakeTokenSymbol) {
      queryBuilder.andWhere('stakeTokens.symbol like :stakeTokenSymbol', {
        stakeTokenSymbol: `%${params.stakeTokenSymbol}%`,
      });
    }

    if (params.rewardTokenSymbol) {
      queryBuilder.andWhere('rewardTokens.symbol like :rewardTokenSymbol', {
        rewardTokenSymbol: `%${params.rewardTokenSymbol}%`,
      });
    }

    return queryBuilder;
  }
}
