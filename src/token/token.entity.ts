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
import { TokenPrice } from '../token-price/token-price.entity';

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

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  symbol: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'integer', nullable: false })
  decimals: number;

  @Column({ type: 'decimal', precision: 65, scale: 22, default: 0 })
  totalSupply: string;

  @ManyToOne(() => Token, (token) => token.pair0, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  pair0: Token;

  @ManyToOne(() => Token, (token) => token.pair1, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  pair1: Token;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logoLink: string;

  @Column({ type: 'bool', default: false })
  swapBase: boolean;

  @Column({ type: 'bool', default: false })
  verify: boolean;

  @OneToOne(() => Token, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  wrapped: Token;

  @OneToOne(() => TokenPrice, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tokenPrice: TokenPrice;

  @BeforeUpdate()
  @BeforeInsert()
  checkInsert(): void {
    if (!this.address) {
      this.address = toCheckSumAddress(this.address);
    }
  }

  get priceUSD(): string {
    return this.tokenPrice?.value || '0';
  }

  get priceKRW(): string {
    return this.priceUSD; // * 환율;
  }

  static relations = ['network', 'pair0', 'pair1', 'wrapped', 'tokenPrice'];

  static recursiveRelations = ['pair0.tokenPrice', 'pair1.tokenPrice'];

  static select = [
    'token.type',
    'token.name',
    'token.symbol',
    'token.decimals',
    'token.address',
    'token.totalSupply',
    'token.logoLink',

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
    'pair0.logoLink',
    'pair0.tokenPrice.value',

    'pair1.name',
    'pair1.symbol',
    'pair1.address',
    'pair1.totalSupply',
    'pair1.decimals',
    'pair1.logoLink',
    'pair1.tokenPrice.value',

    'wrapped.name',
    'wrapped.symbol',
    'wrapped.address',
    'wrapped.totalSupply',
    'wrapped.name',
    'wrapped.decimals',
    'wrapped.logoLink',

    'tokenPrice.value',
  ];
}
