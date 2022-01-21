import { Column, Entity, Index, ManyToOne } from 'typeorm';
import {
  IdEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Network } from '../network/network.entity';
import { INTERACTION_TYPE } from './interaction.constant';

@Entity()
@Index('idx_interaction_1', ['address'], { unique: false })
@Index(
  'idx_interaction_3',
  ['contractAddress', 'address', 'network', 'pid', 'referAddress'],
  {
    unique: true,
  },
)
export class Interaction extends IdEntity(StatusEntity(EmptyEntity)) {
  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column({ type: 'enum', enum: INTERACTION_TYPE })
  type: INTERACTION_TYPE;

  @Column({ type: 'varchar', length: 100 })
  contractAddress: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'integer', nullable: true })
  pid: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  referAddress: string;

  static relations = ['network'];

  static recursiveRelations = [];

  static select = [];
}
