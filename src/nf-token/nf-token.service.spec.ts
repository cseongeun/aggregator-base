import { Test, TestingModule } from '@nestjs/testing';
import { NFTokenService } from './nf-token.service';

describe('NfTokenNFTokenServiceService', () => {
  let service: NFTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NFTokenService],
    }).compile();

    service = module.get<NFTokenService>(NFTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
