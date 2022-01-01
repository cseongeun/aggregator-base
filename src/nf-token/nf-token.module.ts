import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NfTokenService } from './nf-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([NfTokenService])],
  providers: [NfTokenService],
  exports: [NfTokenService],
})
export class NfTokenModule {}
