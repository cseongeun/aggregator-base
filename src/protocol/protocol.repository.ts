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
import { Protocol } from './protocol.entity';
import { RepositoryBase } from '../repository.base';

@EntityRepository(Protocol)
export class ProtocolRepository extends Repository<Protocol> {
  entity: EntityTarget<Protocol> = Protocol;
  relations: string[] = Protocol.relations;
  recursiveRelations: string[] = Protocol.recursiveRelations;

  async findOneBy(
    where?: { [K in keyof any]?: any[K] | FindOperator<any[K]> },
    @TransactionManager() manager?: EntityManager,
  ): Promise<Protocol> {
    const options: FindManyOptions<Protocol> = {
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
  ): Promise<Protocol[]> {
    const options: FindManyOptions<Protocol> = {
      where,
      relations: [...this.relations, ...this.recursiveRelations],
    };

    if (manager) {
      return manager.find(this.entity, options);
    }
    return this.find(options);
  }

  async createOneBy(
    params: DeepPartial<Protocol>,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Protocol> {
    const createEntity = this.create(params);

    if (manager) {
      return manager.save(this.entity, createEntity);
    }
    return this.save(createEntity);
  }

  async createAllBy(
    params: DeepPartial<Protocol>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<Protocol[]> {
    const createEntities = params.map((param) => this.create(param));

    if (manager) {
      return manager.save(this.entity, createEntities);
    }
    return this.save(createEntities);
  }

  async createAllIfNotExistBy(
    params: DeepPartial<Protocol>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<InsertResult> {
    let queryBuilder: SelectQueryBuilder<Protocol>;

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
  //   where: Protocol[keyof Protocol],
  //   set: Protocol[keyof Protocol],
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
