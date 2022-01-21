import { Column, Entity, Index } from 'typeorm';
import {
  IdEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { getChainKey } from '@seongeun/aggregator-util/lib/naming';
import { NETWORK_CHAIN_ID, NETWORK_CHAIN_TYPE } from './network.constant';

@Entity()
@Index('idx_network_1', ['chainType', 'chainId'], { unique: true })
export class Network extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  subName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  currencySymbol: string;

  @Column({
    type: 'enum',
    enum: NETWORK_CHAIN_TYPE,
  })
  chainType: NETWORK_CHAIN_TYPE;

  @Column({
    type: 'enum',
    enum: NETWORK_CHAIN_ID,
  })
  chainId: NETWORK_CHAIN_ID;

  @Column({ type: 'varchar', length: 100, nullable: true })
  multiCallAddress: string;

  @Column({ type: 'json' })
  http: any;

  @Column({ type: 'integer', nullable: true })
  blockTimeSec: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  explorerUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logoLink: string;

  get chainKey(): string {
    return getChainKey(this.chainType, this.chainId);
  }

  static relations = [];

  static recursiveRelations = [];

  static select = [
    'network.name',
    'network.subName',
    'network.currencySymbol',
    'network.chainId',
    'network.explorerUrl',
    'network.logoLink',
  ];
}
