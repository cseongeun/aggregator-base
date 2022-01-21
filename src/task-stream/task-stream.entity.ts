import { Column, Entity, PrimaryColumn } from 'typeorm';
import {
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';

@Entity()
export class TaskStream extends TimeEntity(StatusEntity(EmptyEntity)) {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'json', nullable: true })
  data: string;

  @Column({ default: false })
  streaming: boolean;

  @Column({ default: false })
  blockNumber: number;

  @Column({ type: 'json', nullable: true })
  config: string;

  static relations = [];

  static recursiveRelations = [];

  static select = [];
}
