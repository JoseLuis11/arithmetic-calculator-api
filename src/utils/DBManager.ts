import postgresDataSource from '../dataSources/postgres/connection';
import * as console from 'console';

const runMigrations = async () => {
  await postgresDataSource.initialize();
  console.info('PostgresDataSource Initialized')
  console.info('Running migrations...')
  await postgresDataSource.runMigrations();
  console.info('All migrations ran');
  await postgresDataSource.destroy();
  console.info('And connection closed')
}

const revertMigrations = async (): Promise<void> => {
  await postgresDataSource.initialize();
  console.info('PostgresDataSource Initialized')
  const migrations = postgresDataSource.migrations;

  console.info('Reverting migrations if there are any...')
  for (let i = 0; i < migrations.length; i++) {
    await postgresDataSource.undoLastMigration()
  }
  await postgresDataSource.destroy();
  console.info('Done')
}

export { runMigrations, revertMigrations }
