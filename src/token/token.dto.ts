import { TOKEN_PRICE_ORACLE_TYPE } from '../constant';
import { Network } from '../entity';
import { TOKEN_TYPE } from './token.constant';

export class TokenSearchQuery {
  id?: number | number[];

  address?: string | string[];

  type?: TOKEN_TYPE | TOKEN_TYPE[];

  oracleType?: TOKEN_PRICE_ORACLE_TYPE | TOKEN_PRICE_ORACLE_TYPE[];

  networkId?: number | number[];
}
