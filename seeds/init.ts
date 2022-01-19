import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

const readSqlFile = (filepath: string): string[] => {
  return fs
    .readFileSync(path.join(__dirname, filepath))
    .toString()
    .replace(/\r?\n|\r/g, '')
    .split(';')
    .filter((query) => query?.length);
};

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const seq = [
      readSqlFile('../seeds/sql/aggregator_network.sql'),
      readSqlFile('../seeds/sql/aggregator_token_price.sql'),
      readSqlFile('../seeds/sql/aggregator_contract.sql'),
      readSqlFile('../seeds/sql/aggregator_token.sql'),
      readSqlFile('../seeds/sql/aggregator_protocol.sql'),
      readSqlFile('../seeds/sql/aggregator_task.sql'),
      readSqlFile('../seeds/sql/aggregator_task_stream.sql'),
    ];

    //  foreign_key off
    await connection.query('SET foreign_key_checks = 0;');

    // insert seed
    for await (const table of seq) {
      for await (const query of table) {
        await connection.query(query);
      }
    }

    // foreign_key on
    await connection.query('SET foreign_key_checks = 1;');
  }
}
