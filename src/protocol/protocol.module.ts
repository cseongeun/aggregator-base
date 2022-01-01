import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolRepository } from './protocol.repository';
import { ProtocolService } from './protocol.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProtocolRepository])],
  providers: [ProtocolService],
  exports: [ProtocolService],
})
export class ProtocolModule {}
