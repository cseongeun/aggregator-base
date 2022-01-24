import { Token } from './token.entity';
import { TOKEN_PRICE_ORACLE_TYPE } from '../constant';
import { TOKEN_TYPE } from './token.constant';

export class TokenSearchQuery {
  id?: number | number[];

  address?: string | string[];

  type?: TOKEN_TYPE | TOKEN_TYPE[];

  oracleType?: TOKEN_PRICE_ORACLE_TYPE | TOKEN_PRICE_ORACLE_TYPE[];

  networkId?: number | number[];
}

export class TokenForm {
  static default(token: Token) {
    return {
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      address: token.address,
      totalSupply: token.totalSupply,
      logoLink: token.logoLink,
      verify: token.verify,
      priceUSD: token.priceUSD,
      pair0: token.pair0
        ? {
            name: token.pair0.name,
            symbol: token.pair0.symbol,
            decimals: token.pair0.decimals,
            address: token.pair0.address,
            totalSupply: token.pair0.totalSupply,
            logoLink: token.pair0.logoLink,
            priceUSD: token.pair0.priceUSD,
          }
        : null,
      pair1: token.pair1
        ? {
            name: token.pair1.name,
            symbol: token.pair1.symbol,
            decimals: token.pair1.decimals,
            address: token.pair1.address,
            totalSupply: token.pair1.totalSupply,
            logoLink: token.pair1.logoLink,
            priceUSD: token.pair1.priceUSD,
          }
        : null,
      wrapped: token.wrapped
        ? {
            name: token.wrapped.name,
            symbol: token.wrapped.symbol,
            decimals: token.wrapped.decimals,
            address: token.wrapped.address,
            totalSupply: token.wrapped.totalSupply,
            priceUSD: token.wrapped.priceUSD,
          }
        : null,
    };
  }
}
