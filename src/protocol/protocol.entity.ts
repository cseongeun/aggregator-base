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

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @OneToOne(() => Token, { nullable: true })
  @JoinColumn()
  token: Token;

  @Column({ type: 'bool', default: false })
  useDex: boolean;

  @Column({ type: 'bool', default: false })
  useFarm: boolean;

  @Column({ type: 'bool', default: false })
  useNFT: boolean;

  @Column({ type: 'bool', default: false })
  useLending: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  link: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
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
