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

  @Column()
  cron: string;

  @Column({ nullable: true })
  blockNumber: number;

  @Column({ nullable: true })
  pid: number;

  @Column({ type: 'json', nullable: true })
  data: string;

  @Column({ default: false })
  panic: boolean;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true })
  latestElapsedSecond: string;

  @Column({ type: 'json', nullable: true })
  config: string;

  static relations = [];

  static recursiveRelations = [];

  static select = [];
}
