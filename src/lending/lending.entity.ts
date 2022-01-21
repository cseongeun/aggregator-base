import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
} from 'typeorm';
import { Token } from '../token/token.entity';
import { Protocol } from '../protocol/protocol.entity';
import { toCheckSumAddress } from '@seongeun/aggregator-util/lib/address';
import {
  IdEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';

@Entity()
@Index('idx_lending_1', ['protocol', 'address'], { unique: false })
@Index('idx_lending_3', ['protocol', 'address', 'pid'], { unique: true })
export class Lending extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {
  @ManyToOne(() => Protocol, {
    nullable: false,
  })
  protocol: Protocol;

  @ManyToOne(() => Token, { nullable: false })
  supplyToken: Token;

  @ManyToOne(() => Token, { nullable: false })
  borrowToken: Token;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  pid: number;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidityAmount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidityValue: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  supplyAmount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  supplyValue: string;

  @Column({ nullable: true })
  supplyApy: string;

  @Column({ nullable: true })
  supplyApr: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  borrowAmount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  borrowValue: string;

  @Column({ nullable: true })
  borrowApy: string;

  @Column({ nullable: true })
  borrowApr: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  reserveAmount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  reserveValue: string;

  @Column({ type: 'json', nullable: true })
  data: any;

  @Column({ nullable: true })
  collateralFactor: string;

  @Column({ nullable: true })
  reserveFactor: string;

  @Column({ nullable: true })
  link: string;

  @BeforeInsert()
  @BeforeUpdate()
  toCheckSum(): void {
    if (!this.address) {
      this.address = toCheckSumAddress(this.address);
    }
  }

  static relations = ['protocol', 'supplyToken', 'borrowToken'];

  static recursiveRelations = [
    'protocol.network',
    'supplyToken.tokenPrice',
    'borrowToken.tokenPrice',
  ];

  static select = [
    'lending.id',
    'lending.address',
    'lending.pid',
    'lending.liquidityAmount',
    'lending.liquidityValue',
    'lending.supplyAmount',
    'lending.supplyValue',
    'lending.supplyApy',
    'lending.supplyApr',
    'lending.borrowAmount',
    'lending.borrowValue',
    'lending.borrowApy',
    'lending.borrowApr',
    'lending.reserveAmount',
    'lending.reserveValue',
    'lending.data',
    'lending.collateralFactor',
    'lending.reserveFactor',
    'lending.link',

    'supplyToken.name',
    'supplyToken.symbol',
    'supplyToken.decimals',
    'supplyToken.type',
    'supplyToken.address',
    'supplyToken.totalSupply',
    'supplyToken.logoLink',
    'supplyToken.tokenPrice',

    'borrowToken.name',
    'borrowToken.symbol',
    'borrowToken.decimals',
    'borrowToken.type',
    'borrowToken.address',
    'borrowToken.totalSupply',
    'borrowToken.logoLink',
    'borrowToken.tokenPrice',

    'protocol.id',
    'protocol.name',
    'protocol.link',
    'protocol.logoLink',

    'protocol_network.name',
    'protocol_network.subName',
    'protocol_network.currencySymbol',
    'protocol_network.explorerUrl',
    'protocol_network.logoLink',
  ];
}
