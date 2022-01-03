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
@Unique(['network', 'address', 'counterParty'])
@Index('idx_interaction_1', ['address'], { unique: false })
@Index('idx_interaction_2', ['network', 'address'], { unique: false })
export class Interaction extends IdEntity(StatusEntity(EmptyEntity)) {
  @ManyToOne(() => Network, {
    nullable: false,
  })
  network: Network;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  counterParty: string;

  @BeforeInsert()
  @BeforeUpdate()
  toCheckSum(): void {
    if (!this.address) {
      this.address = toCheckSumAddress(this.address);
    }
    if (!this.counterParty) {
      this.counterParty = toCheckSumAddress(this.counterParty);
    }
  }

  static relations = ['network'];

  static recursiveRelations = [];

  static select = [
    'interaction.address',
    'interaction.counterParty',

    'network.chainId',
  ];
}
