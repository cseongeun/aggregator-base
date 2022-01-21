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
import { TContractAbi } from './contract.interface';

@Entity()
@Index('idx_contract_1', ['network', 'address'], { unique: true })
export class Contract extends IdEntity(EmptyEntity) {
  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'longtext' })
  abi: string;

  getABI(): TContractAbi {
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
