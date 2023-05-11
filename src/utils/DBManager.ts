import postgresDataSource from '../dataSources/postgres/connection';
import * as console from 'console';
import dbOperationHandler from '../dataSources/utils/dbOperationHandler';

const runMigrations = async () => {
  await dbOperationHandler(postgresDataSource, async () => {
    console.info('PostgresDataSource Initialized')
    console.info('Running migrations...')
    await postgresDataSource.runMigrations();
    console.info('All migrations ran');
  })
}

const revertMigrations = async (): Promise<void> => {
  await dbOperationHandler(postgresDataSource, async () => {
    console.info('PostgresDataSource Initialized')
    const migrations = postgresDataSource.migrations;

    console.info('Reverting migrations if there are any...')
    for (let i = 0; i < migrations.length; i++) {
      await postgresDataSource.undoLastMigration()
    }
    console.info('Done')
  })
}

export { runMigrations, revertMigrations }
