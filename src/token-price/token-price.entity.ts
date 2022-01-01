import { Column, Entity, OneToOne } from 'typeorm';
import {
  IdEntity,
  TimeEntity,
  StatusEntity,
  EmptyEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Token } from '../token/token.entity';

@Entity()
export class TokenPrice extends IdEntity(
  TimeEntity(StatusEntity(EmptyEntity)),
) {
  @OneToOne(() => Token)
  token: Token;

  static relations = [];

  static recursiveRelations = [];

  static select = [];
}
