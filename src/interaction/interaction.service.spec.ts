import { INestApplication } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { TestModule } from '../extension/testing/test.module';
import { Token } from '../token/token.entity';

describe('InteractionService', () => {
  const testModule = new TestModule();
  let app: INestApplication;
  let service: InteractionService;

  beforeAll(async () => {
    app = await testModule.createTestModule();
    service = await app.get<InteractionService>(InteractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTokenInteraction', () => {
    it('동작 테스트', async () => {
      const address = '0xFDcBF476B286796706e273F86aC51163DA737FA8';
      const interactions = await service.getTokenInteractions(address);
      console.log(interactions);
    });
  });

  describe('getFarmInteraction', () => {
    it('동작 테스트', async () => {
      const address = '0xFDcBF476B286796706e273F86aC51163DA737FA8';
      const interactions = await service.getFarmInteractions(address);
      console.log(JSON.stringify(interactions));
    });
  });
});
