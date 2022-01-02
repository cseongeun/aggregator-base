import {
  EntityRepository,
  EntityTarget,
  Repository,
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOperator,
  TransactionManager,
  UpdateResult,
  InsertResult,
  SelectQueryBuilder,
  DeleteResult,
} from 'typeorm';
import { Token } from './token.entity';
import { RepositoryBase } from '../repository.base';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  entity: EntityTarget<Token> = Token;
  relations: string[] = Token.relations;
  recursiveRelations: string[] = Token.recursiveRelations;

  async findOneBy(
    where?: { [K in keyof any]?: any[K] | FindOperator<any[K]> },
    @TransactionManager() manager?: EntityManager,
  ): Promise<Token> {
    const options: FindManyOptions<Token> = {
      where,
      relations: [...this.relations, ...this.recursiveRelations],
    };

    if (manager) {
      return manager.findOne(this.entity, options);
    }
    return this.findOne(options);
  }

  async findAllBy(
    where?: {
      [K in keyof any]?: any[K] | FindOperator<any[K]>;
    },
    @TransactionManager() manager?: EntityManager,
  ): Promise<Token[]> {
    const options: FindManyOptions<Token> = {
      where,
      relations: [...this.relations, ...this.recursiveRelations],
    };

    if (manager) {
      return manager.find(this.entity, options);
    }
    return this.find(options);
  }

  async createOneBy(
    params: DeepPartial<Token>,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Token> {
    const createEntity = this.create(params);

    if (manager) {
      return manager.save(this.entity, createEntity);
    }
    return this.save(createEntity);
  }

  async createAllBy(
    params: DeepPartial<Token>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<Token[]> {
    const createEntities = params.map((param) => this.create(param));

    if (manager) {
      return manager.save(this.entity, createEntities);
    }
    return this.save(createEntities);
  }

  async createAllIfNotExistBy(
    params: DeepPartial<Token>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<InsertResult> {
    let queryBuilder: SelectQueryBuilder<Token>;

    if (manager) {
      queryBuilder = manager.createQueryBuilder();
    } else {
      queryBuilder = this.createQueryBuilder();
    }

    const createEntities = params.map((param) => this.create(param));

    return queryBuilder
      .insert()
      .into(this.target)
      .values(createEntities)
      .orIgnore()
      .execute();
  }

  // async updateOneBy(
  //   where: Token[keyof Token],
  //   set: Token[keyof Token],
  //   @TransactionManager() manager?: EntityManager,
  // ): Promise<UpdateResult> {
  //   if (manager) {
  //     return manager.update(this.entity, where, set);
  //   }
  //   return this.update(where, set);
  // }

  async deleteOneBy(
    where?: {
      [K in keyof any]?: any[K] | FindOperator<any[K]>;
    },
    @TransactionManager() manager?: EntityManager,
  ): Promise<DeleteResult> {
    if (manager) {
      return manager.delete(this.entity, where);
    }
    return this.delete(where);
  }
}
