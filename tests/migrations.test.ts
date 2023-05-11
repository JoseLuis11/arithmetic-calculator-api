import { describe } from '@jest/globals';
import { revertMigrations, runMigrations } from '@utils/DBManager';
import { enumTypeExists, migrationExists, tableExists } from './utils/tableExists';
import {
  CreateOperationTable1683410581089
} from '../src/dataSources/postgres/typeorm/migrations/1683410581089-CreateOperationTable';
import { operationInteractor } from '@core/interactors';
import dbOperationHandler from '../src/dataSources/utils/dbOperationHandler';
import postgresDataSource from '../src/dataSources/postgres/connection';
import { initialOperations } from '../src/dataSources/postgres/typeorm/initialData/operations';
import { AddOperations1683410895769 } from '../src/dataSources/postgres/typeorm/migrations/1683410895769-AddOperations';

describe('migrations module', () => {
  describe('running migrations', () => {
    beforeAll(async () => {
      await runMigrations();
    })

    it('should run CreateOperationTable migration', async () => {
      expect(await enumTypeExists('operation_type_enum')).toBeTruthy();
      expect(await tableExists('operation')).toBeTruthy()
      expect(await migrationExists(CreateOperationTable1683410581089.name)).toBeTruthy();
    });

    it('should run AddOperations migration', async () => {
      let operations;
      await dbOperationHandler(postgresDataSource, async () => {
        operations = await operationInteractor.findAll();
      });

      expect(operations.every(op => !!initialOperations.find(operation => {
        return operation.type === op.type && operation.cost === op.cost;
      }))).toBeTruthy();

      expect(await migrationExists(AddOperations1683410895769.name)).toBeTruthy();
    });
  })

  describe('reverting migrations', () => {
    beforeAll(async  () => {
      await revertMigrations();
    })

    it('should revert CreateOperationTable migration', async () => {
      expect(await enumTypeExists('operation_type_enum')).toBeFalsy();
      expect(await tableExists('operation')).toBeFalsy()
      expect(await migrationExists(CreateOperationTable1683410581089.name)).toBeFalsy();
    });

    it('should revert AddOperations migrations', async () => {
      expect(await migrationExists(AddOperations1683410895769.name)).toBeFalsy();
    });
  })
})
