import postgresDataSource from '../../src/dataSources/postgres/connection';
import DBOperationHandler from '../../src/dataSources/utils/dbOperationHandler';
import MigrationSchema from '../../src/dataSources/postgres/typeorm/schemas/MigrationSchema';

const tableExists = async (tableName: string): Promise<boolean> => {
  let exists;
  await DBOperationHandler(postgresDataSource, async () => {
    const query = 'SELECT exists (' +
      'SELECT 1 FROM information_schema.tables ' +
        `WHERE table_name = '${tableName}'` +
      ')';

    const table = await postgresDataSource.manager.query(query)
    exists = await table[0].exists;
  })
  return exists;
}

const enumTypeExists = async (enumTypeName: string): Promise<boolean> => {
  let exists;
  await DBOperationHandler(postgresDataSource, async () => {
    const query = `SELECT exists (SELECT 1 FROM pg_type WHERE typname = '${enumTypeName}');`
    const enumType = await postgresDataSource.manager.query((query));
    exists = await enumType[0].exists;
  })
  return exists;
}

const migrationExists = async (migrationName: string): Promise<boolean> => {
  let exists;
  await DBOperationHandler(postgresDataSource, async () => {
    const migration = await postgresDataSource.manager.getRepository(MigrationSchema).findOneBy({ name: migrationName })
    exists = !!migration;
  })
  return exists;
}

export { tableExists, enumTypeExists, migrationExists };
