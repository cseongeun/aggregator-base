/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository('network')
      .save(require('./data/network.json'));
    await connection.getRepository('token').save(require('./data/token.json'));
    await connection
      .getRepository('protocol')
      .save(require('./data/protocol.json'));
    await connection
      .getRepository('contract')
      .save(require('./data/contract.json'));
    await connection.getRepository('task').save(require('./data/task.json'));
    // await connection
    //   .getRepository('interaction')
    //   .save(require('./data/interaction.json'));
  }
}
