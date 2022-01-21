import { Provider } from '@ethersproject/providers';
import { INestApplication } from '@nestjs/common';
import { In, IsNull, Not } from 'typeorm';
import { TestModule } from '../extension/testing/test.module';
import { TOKEN_PRICE_ORACLE_TYPE } from '../token-price/token-price.constant';
import { TokenPriceService } from '../token-price/token-price.service';
import { Token } from './token.entity';
import { TokenService } from './token.service';
import * as fs from 'fs';
import { TOKEN_TYPE } from './token.constant';
import { NetworkService } from '../network/network.service';
import { get } from '@seongeun/aggregator-util/lib/object';
describe('TokenService', () => {
  const testModule = new TestModule();
  let app: INestApplication;
  let service: TokenService;
  let tokenPriceService: TokenPriceService;
  let networkService: NetworkService;

  beforeAll(async () => {
    app = await testModule.createTestModule();
    service = await app.get<TokenService>(TokenService);
    tokenPriceService = await app.get<TokenPriceService>(TokenPriceService);
    networkService = await app.get<NetworkService>(NetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('get token', () => {
    it('test', async () => {
      const token = await service.repository.findOneBy({ id: 1 });
      console.log(token);
    });
  });

  describe('migration', () => {
    it('mi', async () => {
      const result = await service.search({
        networkId: 2,
        type: [TOKEN_TYPE.NATIVE, TOKEN_TYPE.SINGLE],
        oracleType: TOKEN_PRICE_ORACLE_TYPE.CHAIN_LINK,
      });
      result.map(({ tokenPrice: { oracleData } }) => {
        const r = JSON.stringify(oracleData);
        console.log(get(JSON.parse(r), 'feed'));

        const feed = get(JSON.parse(JSON.stringify(oracleData)), 'feed');
        console.log(feed);
      });
    });
  });
});
