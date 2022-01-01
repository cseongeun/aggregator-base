import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { toCheckSumAddress } from '@seongeun/aggregator-util/lib/address';
import {
  IdEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { TOKEN_TYPE } from './token.constant';
import { Network } from '../network/network.entity';

@Entity()
@Index('idx_token_1', ['network', 'address'], { unique: true })
export class Token extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {
  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column({
    type: 'enum',
    enum: TOKEN_TYPE,
  })
  type: TOKEN_TYPE;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  address: string;

  @Column()
  decimals: number;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  totalSupply: string;

  @ManyToOne(
    () => Token,
    token => token.pair0,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  pair0: Token;

  @ManyToOne(
    () => Token,
    token => token.pair1,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  pair1: Token;

  @Column({ nullable: true })
  priceAddress: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  priceValue: string;

  @Column('json', { nullable: true })
  beforeDayPriceValue: string;

  @Column({ nullable: true })
  logoLink: string;

  @Column({ default: false })
  swapBase: boolean;

  @OneToOne(() => Token, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  wrapped: Token;

  @BeforeUpdate()
  @BeforeInsert()
  checkInsert(): void {
    if (!this.address) {
      this.address = toCheckSumAddress(this.address);
    }
  }

  static relations = ['network', 'pair0', 'pair1', 'wrapped'];

  static recursiveRelations = [];

  static select = [
    'token.type',
    'token.name',
    'token.symbol',
    'token.decimals',
    'token.address',
    'token.totalSupply',
    'token.priceValue',
    'token.logoLink',
    'token.beforeDayPriceValue',

    'network.name',
    'network.subName',
    'network.currencySymbol',
    'network.chainType',
    'network.chainId',
    'network.explorerUrl',
    'network.logoLink',

    'pair0.name',
    'pair0.symbol',
    'pair0.address',
    'pair0.totalSupply',
    'pair0.decimals',
    'pair0.priceValue',
    'pair0.logoLink',

    'pair1.name',
    'pair1.symbol',
    'pair1.address',
    'pair1.totalSupply',
    'pair1.decimals',
    'pair1.priceValue',
    'pair1.logoLink',

    'wrapped.name',
    'wrapped.symbol',
    'wrapped.address',
    'wrapped.totalSupply',
    'wrapped.name',
    'wrapped.decimals',
    'wrapped.priceValue',
    'wrapped.logoLink',
  ];
}
