import 'dotenv/config';
import { Table } from 'typeorm/';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { createHash } from '@seongeun/aggregator-util/lib/crypto';

export class ConstraintSnakeNamingStrategy extends SnakeNamingStrategy {
  constructor() {
    super();
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `pk_${table}_${columnsSnakeCase}`;
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
  ): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

    const name = columnNames.reduce(
      (name, column) => `${name}_${column}`,
      `${tableOrName}_${referencedTablePath}`,
    );

    return `fk_${createHash('md5', name)}`;
  }
}

export const typeOrmConfig = (
  type = 'mysql',
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
) => {
  return {
    type,
    host,
    port: parseInt(port, 10),
    username,
    password,
    database,
    synchronize: false,
    logging: false,
    autoLoadEntities: true,
    extra: {
      connectionLimit: 100,
    },
    charset: 'utf8mb4',
    namingStrategy: new ConstraintSnakeNamingStrategy(),
    entities: ['src/**/*.entity.ts'],
    subscribers: ['src/**/*.subscribe.ts'],
  };
};
