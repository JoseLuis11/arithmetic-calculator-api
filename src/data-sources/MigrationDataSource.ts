import MigrationRepository from '@core/repositories/MigrationRepository';
import postgresDataSource from './postgres/connection';
import dbOperationHandler from './utils/dbOperationHandler';

class MigrationDataSource implements MigrationRepository {
  async revertMigrations(): Promise<void> {
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

  async runMigrations(): Promise<void> {
    await dbOperationHandler(postgresDataSource, async () => {
      console.info('PostgresDataSource Initialized')
      console.info('Running pending migrations if there are any...')
      await postgresDataSource.runMigrations();
      console.info('Done');
    })
  }

}

export default MigrationDataSource;
