import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOperator,
  Repository,
  TransactionManager,
  EntityTarget,
  UpdateResult,
  InsertResult,
  SelectQueryBuilder,
  DeleteResult,
} from 'typeorm';

export abstract class RepositoryBase<T> extends Repository<T> {
  abstract entity: EntityTarget<T>;
  abstract relations: string[];
  abstract recursiveRelations: string[];
  abstract select: string[];

  // Wrapped findOne
  async findOneBy(
    where?: { [K in keyof any]?: any[K] | FindOperator<any[K]> },
    @TransactionManager() manager?: EntityManager,
  ): Promise<T> {
    const options: FindManyOptions<T> = {
      where,
      relations: [...this.relations, ...this.recursiveRelations],
    };

    if (manager) {
      return manager.findOne(this.entity, options);
    }
    return this.findOne(options);
  }

  // Wrapped find
  async findAllBy(
    where?: {
      [K in keyof any]?: any[K] | FindOperator<any[K]>;
    },
    @TransactionManager() manager?: EntityManager,
  ): Promise<T[]> {
    const options: FindManyOptions<T> = {
      where,
      relations: [...this.relations, ...this.recursiveRelations],
    };

    if (manager) {
      return manager.find(this.entity, options);
    }
    return this.find(options);
  }

  // Wrapped save
  async createOneBy(
    params: DeepPartial<T>,
    @TransactionManager() manager?: EntityManager,
  ): Promise<T> {
    const createEntity = this.create(params);

    if (manager) {
      return manager.save(this.entity, createEntity);
    }
    return this.save(createEntity);
  }

  // Wrapped multiply save
  async createAllBy(
    params: DeepPartial<T>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<T[]> {
    const createEntities = params.map((param) => this.create(param));

    if (manager) {
      return manager.save(this.entity, createEntities);
    }
    return this.save(createEntities);
  }

  // Wrapped multiply save (if not exist)
  async createAllIfNotExistBy(
    params: DeepPartial<T>[],
    @TransactionManager() manager?: EntityManager,
  ): Promise<InsertResult> {
    let queryBuilder: SelectQueryBuilder<T>;

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

  // Wrapped update
  async updateOneBy(
    where: { [K in keyof T]?: any | FindOperator<T[K]> },
    set: { [K in keyof T]?: any },
    @TransactionManager() manager?: EntityManager,
  ): Promise<UpdateResult> {
    if (manager) {
      return manager.update(this.entity, where, set);
    }
    return this.update(where, set);
  }

  // Wrapped delete
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
