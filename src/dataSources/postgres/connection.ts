import { DataSource } from 'typeorm';
import { migrations } from './typeorm/migrations';
import { schemas } from './typeorm/schemas';
import accessEnv from '@utils/accessEnv';
import dotenv from 'dotenv';

dotenv.config();

const postgresDataSource = new DataSource({
  type: 'postgres',
  url: accessEnv('DB_URI'),
  synchronize: false,
  logging: false,
  entities: [...schemas],
  migrations: [...migrations],
})

export default postgresDataSource;
