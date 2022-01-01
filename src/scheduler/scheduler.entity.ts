import { Column, Entity } from 'typeorm';
import {
  UuidEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';

@Entity()
export class Scheduler extends UuidEntity(
  TimeEntity(StatusEntity(EmptyEntity)),
) {
  @Column()
  type: string;

  @Column()
  identity: string;

  @Column()
  cron: string;

  @Column({ nullable: true, default: 0 })
  blockNumber: number;

  @Column({ nullable: true })
  pid: number;

  @Column('text')
  data: string;

  @Column({ default: false })
  error: boolean;

  @Column({ default: 0 })
  process: boolean;

  updateBlockNumber(blockNumber: number) {
    this.blockNumber = blockNumber;
  }

  updatePid(pid: number) {
    this.blockNumber = pid;
  }

  static relations = [];

  static recursiveRelations = [];

  static select = [];
}
