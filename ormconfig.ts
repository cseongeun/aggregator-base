import 'dotenv/config';
import { typeOrmConfig } from './src/database.base';

export default {
  ...typeOrmConfig(
    'mysql',
    process.env.MYSQL_HOST,
    process.env.MYSQL_PORT,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE,
  ),
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
    subscribersDir: 'subscribers',
  },
  seeds: ['seeds/**/*.ts'],
};
