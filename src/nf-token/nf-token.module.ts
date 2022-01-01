import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFTokenRepository } from '..';
import { NFTokenService } from './nf-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([NFTokenRepository])],
  providers: [NFTokenService],
  exports: [NFTokenService],
})
export class NFTokenModule {}
