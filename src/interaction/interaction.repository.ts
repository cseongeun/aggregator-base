import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityRepository,
  EntityTarget,
  FindManyOptions,
  FindOperator,
  InsertResult,
  Repository,
  SelectQueryBuilder,
  TransactionManager,
} from 'typeorm';
import { RepositoryBase } from '../repository.base';
import { Interaction } from './interaction.entity';

@EntityRepository(Interaction)
export class InteractionRepository extends RepositoryBase<Interaction> {
  entity: EntityTarget<Interaction> = Interaction;
  relations: string[] = Interaction.relations;
  recursiveRelations: string[] = Interaction.recursiveRelations;


  async _search(params: any): Promise<any[]> {
    const queryBuilder = this.createQueryBuilder('interaction');

    this._searchQueryBuilder(queryBuilder, params);

    if (params.skipItems) {
      queryBuilder.offset(params.skipItems);
    }

    if (params.limit) {
      queryBuilder.limit(params.limit);
    }

    queryBuilder.select(Interaction.select);

    const result = await queryBuilder.disableEscaping().getMany();
    return result;
  }

  async _searchDistinct(params: any, distinct: string): Promise<any[]> {
    const queryBuilder = this.createQueryBuilder('interaction');

    this._searchQueryBuilder(queryBuilder, params);

    queryBuilder.distinct(true).select(distinct);

    const result = await queryBuilder.getRawMany();

    return result.map(r => r[distinct.replace('.', '_')]);
  }

  _searchQueryBuilder(
    queryBuilder: SelectQueryBuilder<Interaction>,
    params: any,
  ): SelectQueryBuilder<Interaction> {
    // relations
    Interaction.relations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(`interaction.${relation}`, relation);
    });

    // recursive relations
    Interaction.recursiveRelations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect(relation, relation.replace('.', '_'));
    });

    if (params.fromAddress) {
      queryBuilder.andWhere('interaction.fromAddress = :fromAddress', {
        fromAddress: params.fromAddress,
      });
    }

    if (params.chainId) {
      queryBuilder.andWhere('network.chainId = :chainId', {
        chainId: params.chainId,
      });
    }

    if (params.type) {
      queryBuilder.andWhere('interaction.type = :type', {
        type: params.type,
      });
    }

    if (params.types) {
      queryBuilder.andWhere('interaction.type in (:types)', {
        types: params.types,
      });
    }

    return queryBuilder;
  }
}
