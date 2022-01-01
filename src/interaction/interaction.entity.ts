import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
  Unique,
} from 'typeorm';
import { toCheckSumAddress } from '@seongeun/aggregator-util/lib/address';
import {
  IdEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Network } from '../network/network.entity';

@Entity()
@Unique(['network', 'fromAddress', 'toAddress'])
@Index('idx_interaction_1', ['fromAddress'], { unique: false })
@Index('idx_interaction_2', ['network', 'fromAddress'], { unique: false })
export class Interaction extends IdEntity(StatusEntity(EmptyEntity)) {
  @ManyToOne(() => Network, {
    nullable: false,
  })
  network: Network;

  @Column({ nullable: true })
  fromAddress: string;

  @Column({ nullable: true })
  toAddress: string;

  @BeforeInsert()
  @BeforeUpdate()
  toCheckSum(): void {
    if (!this.fromAddress) {
      this.fromAddress = toCheckSumAddress(this.fromAddress);
    }
    if (!this.toAddress) {
      this.toAddress = toCheckSumAddress(this.toAddress);
    }
  }

  static relations = ['network'];

  static recursiveRelations = [];

  static select = [
    'interaction.fromAddress',
    'interaction.toAddress',

    'network.chainId',
  ];
}
