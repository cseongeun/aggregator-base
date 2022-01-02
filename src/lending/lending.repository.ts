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
import { Lending } from './lending.entity';
import { RepositoryBase } from '../repository.base';

@EntityRepository(Lending)
export class LendingRepository extends Repository<Lending> {
  entity: EntityTarget<Lending> = Lending;
  relations: string[] = Lending.relations;
  recursiveRelations: string[] = Lending.recursiveRelations;

  async findOneBy(
    where?: { [K in keyof any]?: any[K] | FindOperator<any[K]> },
    @TransactionManager() manager?: EntityManager,
  ): Promise<Lending> {
    const options: FindManyOptions<Lending> = {
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
  ): Promise<Lending[]> {
    const options: FindManyOptions<Lending> = {
      where,
      relations: [...this.relations, ...this.recursiveRelations],
    };

    if (manager) {
      return manager.find(this.entity, options);
    }
    return this.find(options);
  }

  async createOneBy(
    params: DeepPartial<Lending>,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Lending> {
    const createEntity = this.create(params);

    if (manager) {
      return manager.save(this.entity, createEntity);
    }
    return this.save(createEntity);
  }

  async createAllBy(
    params: DeepPartial<Lending>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<Lending[]> {
    const createEntities = params.map((param) => this.create(param));

    if (manager) {
      return manager.save(this.entity, createEntities);
    }
    return this.save(createEntities);
  }

  async createAllIfNotExistBy(
    params: DeepPartial<Lending>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<InsertResult> {
    let queryBuilder: SelectQueryBuilder<Lending>;

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
  //   where: Lending[keyof Lending],
  //   set: Lending[keyof Lending],
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
