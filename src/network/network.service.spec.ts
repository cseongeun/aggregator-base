import { Provider } from '@ethersproject/providers';
import { INestApplication } from '@nestjs/common';
import { TestModule } from '../extension/testing/test.module';
import { NetworkService } from './network.service';

describe('NetworkService', () => {
  const testModule = new TestModule();
  let app: INestApplication;
  let service: NetworkService;

  beforeAll(async () => {
    app = await testModule.createTestModule();
    service = await app.get<NetworkService>(NetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Base. Accessor', () => {
    it('provider', async () => {
      expect(service.provider).toBeInstanceOf(Provider);
    });
  });

  describe('getFarmsByAddress', () => {
    it('pass', () => {
      return;
    });
  });
  describe('generateNetworkProviders', () => {
    it('동작 테스트', async () => {
      const network = await service.repository.findOneBy({ chainId: 56 });
      console.log(network);
    });
  });
});
