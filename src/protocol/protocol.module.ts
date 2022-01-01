import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolService } from './protocol.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProtocolService])],
  providers: [ProtocolService],
  exports: [ProtocolService],
})
export class ProtocolModule {}
