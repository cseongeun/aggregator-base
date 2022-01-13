import { Column, Entity, ManyToOne } from 'typeorm';
import {
  IdEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Network } from '../network/network.entity';
import { INTERACTION_TYPE } from './interaction.constant';

@Entity()
export class Interaction extends IdEntity(StatusEntity(EmptyEntity)) {
  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column({ type: 'enum', enum: INTERACTION_TYPE })
  type: INTERACTION_TYPE;

  @Column()
  contractAddress: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  pid: string;

  static relations = ['network'];

  static recursiveRelations = [];

  static select = [];
}
