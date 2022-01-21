import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import {
  IdEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Network } from '../network/network.entity';
import { Token } from '../token/token.entity';

@Entity()
export class Protocol extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {
  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column()
  name: string;

  @OneToOne(() => Token, { nullable: true })
  @JoinColumn()
  token: Token;

  @Column({ default: false })
  useDex: boolean;

  @Column({ default: false })
  useFarm: boolean;

  @Column({ default: false })
  useNFT: boolean;

  @Column({ default: false })
  useLending: boolean;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  logoLink: string;

  static relations = ['network', 'token'];

  static recursiveRelations = ['token.tokenPrice'];

  static select = [
    'protocol.id',
    'protocol.name',
    'protocol.useDex',
    'protocol.useFarm',
    'protocol.useLending',
    'protocol.useNFT',
    'protocol.link',
    'protocol.logoLink',

    'network.name',
    'network.subName',
    'network.currencySymbol',
    'network.explorerUrl',
    'network.logoLink',

    'token.name',
    'token.symbol',
    'token.decimals',
    'token.address',
    'token.totalSupply',
    'token.logoLink',
  ];
}
