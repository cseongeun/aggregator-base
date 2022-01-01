import { Table } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as crypto from 'crypto';

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

    return `fk_${crypto
      .createHash('md5')
      .update(name)
      .digest('hex')}`;
  }
}

module.exports = {
  type: 'mysql',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: '',
  synchronize: false,
  logging: false,
  autoLoadEntities: true,
  entities: ['src/**/*.entity.ts'],
  subscribers: ['src/**/*.subscribe.ts'],
  extra: {
    connectionLimit: 100,
  },
  charset: 'utf8mb4',
  namingStrategy: new ConstraintSnakeNamingStrategy(),
};
