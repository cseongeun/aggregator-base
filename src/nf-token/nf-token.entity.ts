import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
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

@Entity()
@Index('idx_nfToken_1', ['protocol', 'address', 'index'])
@Index('idx_nfToken_2', ['address'], { unique: false })
export class NFToken extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {
  @ManyToOne(() => Protocol, {
    nullable: false,
  })
  protocol: Protocol;

  @Column()
  address: string;

  @Column()
  index: number;

  @Column({ nullable: true })
  tokenUri: string;

  @Column({ nullable: true })
  imageOrAnimationUri: string;

  @BeforeInsert()
  @BeforeUpdate()
  toCheckSum(): void {
    if (!this.address) {
      this.address = toCheckSumAddress(this.address);
    }
  }

  static relations = ['protocol'];

  static recursiveRelations = ['protocol.network'];

  static select = [
    'nfToken.id',
    'nfToken.address',
    'nfToken.index',
    'nfToken.tokenUri',
    'nfToken.imageOrAnimationUri',

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
