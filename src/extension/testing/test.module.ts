import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { typeOrmConfig } from '../database.base';
import { NetworkModule, TokenModule, TokenPriceModule } from '../../module';

export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...typeOrmConfig(
        'mysql',
        process.env.MYSQL_HOST,
        process.env.MYSQL_PORT,
        process.env.MYSQL_USERNAME,
        process.env.MYSQL_PASSWORD,
        process.env.MYSQL_DATABASE,
      ),
      type: 'mysql',
    };
  }
}
export class TestModule {
  module: TestingModule;
  app: INestApplication;

  async createTestModule(): Promise<INestApplication> {
    this.module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({ useClass: MysqlConfigService }),
        NetworkModule,
        TokenModule,
        TokenPriceModule,
      ],
    }).compile();

    this.app = this.module.createNestApplication();

    await this.app.init();
    return this.app;
  }
}
