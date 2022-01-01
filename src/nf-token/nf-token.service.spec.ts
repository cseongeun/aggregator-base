import { Test, TestingModule } from '@nestjs/testing';
import { NfTokenService } from './nf-token.service';

describe('NfTokenService', () => {
  let service: NfTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NfTokenService],
    }).compile();

    service = module.get<NfTokenService>(NfTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
