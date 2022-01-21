import { Column, Entity, PrimaryColumn } from 'typeorm';
import {
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';

@Entity()
export class Task extends TimeEntity(StatusEntity(EmptyEntity)) {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  cron: string;

  @Column({ type: 'integer', nullable: true })
  blockNumber: number;

  @Column({ type: 'integer', nullable: true })
  pid: number;

  @Column({ type: 'json', nullable: true })
  data: string;

  @Column({ type: 'bool', default: false })
  panic: boolean;

  @Column({ type: 'bool', default: false })
  active: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  latestElapsedSecond: string;

  @Column({ type: 'json', nullable: true })
  config: string;

  static relations = [];

  static recursiveRelations = [];

  static select = [];
}
