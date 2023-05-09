import { DataSource } from 'typeorm';
import OperationSchema from '../typeorm/schemas/OperationSchema';
import { migrations } from '../typeorm/migrations';
import accessEnv from '@utils/accessEnv';
import dotenv from 'dotenv';

dotenv.config();

const postgresDataSource = new DataSource({
  type: 'postgres',
  url: accessEnv('DB_URI'),
  synchronize: false,
  logging: false,
  entities: [OperationSchema],
  migrations: [...migrations],
})

export default postgresDataSource;
