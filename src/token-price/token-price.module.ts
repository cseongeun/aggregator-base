import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPriceRepository } from './token-price.repository';
import { TokenPriceService } from './token-price.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenPriceRepository])],
  providers: [TokenPriceService],
  exports: [TokenPriceService],
})
export class TokenPriceModule {}
