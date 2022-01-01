import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { toCheckSumAddress } from '@seongeun/aggregator-util/lib/address';
import {
  IdEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Protocol } from '../protocol/protocol.entity';
import { Token } from '../token/token.entity';

@Entity()
@Index('idx_farm_1', ['protocol', 'address'], { unique: false })
@Index('idx_farm_2', ['protocol', 'pid'], { unique: false })
@Index('idx_farm_3', ['protocol', 'address', 'pid'], { unique: true })
@Index('idx_farm_4', ['address'], { unique: false })
export class Farm extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {
  @ManyToOne(() => Protocol, { nullable: false })
  protocol: Protocol;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  pid: number;

  @Column()
  assets: string;

  @ManyToMany(() => Token)
  @JoinTable()
  stakeTokens: Token[];

  @ManyToMany(() => Token)
  @JoinTable()
  rewardTokens: Token[];

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidityAmount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidityValue: string;

  @Column({ nullable: true })
  apy: string;

  @Column({ nullable: true })
  apr: string;

  @Column({ nullable: true })
  data: string;

  @Column({ nullable: true })
  link: string;

  @BeforeInsert()
  @BeforeUpdate()
  toCheckSum(): void {
    if (!this.address) {
      this.address = toCheckSumAddress(this.address);
    }
  }

  static relations = ['protocol', 'stakeTokens', 'rewardTokens'];

  static recursiveRelations = [
    'protocol.network',
    'stakeTokens.pair0',
    'stakeTokens.pair1',
    'rewardTokens.pair0',
    'rewardTokens.pair1',
  ];

  static select = [
    'farm.id',
    'farm.name',
    'farm.address',
    'farm.pid',
    'farm.assets',
    'farm.liquidityAmount',
    'farm.liquidityValue',
    'farm.data',
    'farm.apr',
    'farm.link',

    'protocol.id',
    'protocol.name',
    'protocol.link',
    'protocol.logoLink',

    'protocol_network.name',
    'protocol_network.subName',
    'protocol_network.chainId',
    'protocol_network.currencySymbol',
    'protocol_network.explorerUrl',
    'protocol_network.logoLink',

    'stakeTokens.name',
    'stakeTokens.symbol',
    'stakeTokens.type',
    'stakeTokens.decimals',
    'stakeTokens.address',
    'stakeTokens.totalSupply',
    'stakeTokens.priceValue',
    'stakeTokens.logoLink',

    'stakeTokens_pair0.name',
    'stakeTokens_pair0.symbol',
    'stakeTokens_pair0.decimals',
    'stakeTokens_pair0.address',
    'stakeTokens_pair0.totalSupply',
    'stakeTokens_pair0.priceValue',
    'stakeTokens_pair0.logoLink',

    'stakeTokens_pair1.name',
    'stakeTokens_pair1.symbol',
    'stakeTokens_pair1.decimals',
    'stakeTokens_pair1.address',
    'stakeTokens_pair1.totalSupply',
    'stakeTokens_pair1.priceValue',
    'stakeTokens_pair1.logoLink',

    'rewardTokens.name',
    'rewardTokens.symbol',
    'rewardTokens.decimals',
    'rewardTokens.type',
    'rewardTokens.address',
    'rewardTokens.totalSupply',
    'rewardTokens.priceValue',
    'rewardTokens.logoLink',

    'rewardTokens_pair0.name',
    'rewardTokens_pair0.symbol',
    'rewardTokens_pair0.decimals',
    'rewardTokens_pair0.address',
    'rewardTokens_pair0.totalSupply',
    'rewardTokens_pair0.priceValue',
    'rewardTokens_pair0.logoLink',

    'rewardTokens_pair1.name',
    'rewardTokens_pair1.symbol',
    'rewardTokens_pair1.decimals',
    'rewardTokens_pair1.address',
    'rewardTokens_pair1.totalSupply',
    'rewardTokens_pair1.priceValue',
    'rewardTokens_pair1.logoLink',
  ];
}
