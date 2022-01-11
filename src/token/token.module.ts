import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPriceRepository } from '../token-price/token-price.repository';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenRepository, TokenPriceRepository])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
