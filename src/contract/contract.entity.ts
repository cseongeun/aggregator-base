import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
} from 'typeorm';
import { toCheckSumAddress } from '@seongeun/aggregator-util/lib/address';
import { IdEntity, EmptyEntity } from '@seongeun/aggregator-util/lib/entity';
import { Network } from '../network/network.entity';

@Entity()
@Index('idx_contract_1', ['network', 'address'], { unique: true })
export class Contract extends IdEntity(EmptyEntity) {
  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column()
  address: string;

  @Column('longtext')
  abi: string;

  getABI(): unknown {
    return JSON.parse(JSON.stringify(this.abi));
  }

  @BeforeInsert()
  @BeforeUpdate()
  toCheckSum(): void {
    if (!this.address) {
      this.address = toCheckSumAddress(this.address);
    }
  }

  static relations = ['network'];

  static recursiveRelations = [];

  static select = [];
}
