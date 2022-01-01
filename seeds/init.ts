/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Network } from '@libs/repository/network/entity';
import { Token } from '@libs/repository/token/entity';
import { Protocol } from '@libs/repository/protocol/entity';
import { Scheduler } from '@libs/repository/scheduler/entity';
import { Interaction } from '@libs/repository/interaction/entity';
import { Abi } from '@libs/repository/abi/entity';

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository('network').save(require('./data/network.json'));

    await connection.getRepository('token').save(require('./data/token.json'));

    await connection.getRepository('protocol').save(require('./data/protocol.json'));

    await connection.getRepository('abi').save(require('./data/abi.json'));

    await connection.getRepository('scheduler').save(require('./data/scheduler.json'));

    await connection.getRepository('interaction').save(require('./data/interaction.json'));

    await connection.getRepository('user').save(require('./data/user.json'));

    await connection.getRepository('user_wallet').save(require('./data/user-wallet.json'));

    await connection
      .getRepository('user_wallet_address')
      .save(require('./data/user-wallet-address.json'));
  }
}
