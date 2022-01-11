import {
  EmptyEntity,
  IdEntity,
  TimeEntity,
} from '@seongeun/aggregator-util/lib/entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Token } from '../token/token.entity';
import { TOKEN_PRICE_ORACLE_TYPE } from './token-price.constant';

@Entity()
export class TokenPrice extends IdEntity(TimeEntity(EmptyEntity)) {
  @OneToOne(() => Token, (Token) => Token.tokenPrice, { nullable: false })
  @JoinColumn()
  token: Token;

  @Column({ type: 'enum', enum: TOKEN_PRICE_ORACLE_TYPE, nullable: true })
  oracleType: TOKEN_PRICE_ORACLE_TYPE;

  @Column({ type: 'json', nullable: true })
  oracleData: any;

  @Column({ type: 'decimal', precision: 65, scale: 22, default: 0 })
  value: string;

  @Column({ type: 'json', nullable: true })
  historicalValue: any;

  static relations = [];
  static recursiveRelations = [];
  static select = [];
}
