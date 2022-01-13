import { Column, Entity, ManyToOne } from 'typeorm';
import {
  IdEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Network } from '../entity';

@Entity()
export class Event extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {
  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column()
  address: string;

  @Column()
  name: string;

  @Column({ type: 'json', nullable: true })
  args: any;

  @Column({ nullable: true })
  blockNumber: number;

  @Column({ nullable: true })
  transactionHash: string;

  static relations = ['network'];

  static recursiveRelations = [];

  static select = [];
}
