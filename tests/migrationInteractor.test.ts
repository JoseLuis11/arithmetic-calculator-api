import { describe } from '@jest/globals';
import MigrationRepository from '@core/repositories/MigrationRepository';
import MigrationInteractor from '@core/interactors/MigrationInteractor';

describe('migration interactor test suite', () => {
  let migrationRepository: MigrationRepository;
  let migrationInteractor: MigrationInteractor;

  beforeEach(() => {
    migrationRepository = {
      runMigrations: jest.fn(),
      revertMigrations: jest.fn(),
    }
    migrationInteractor = new MigrationInteractor(migrationRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('runMigrations function should', () => {
    test('call repository runMigrations function', async () => {
      await migrationInteractor.runMigrations();
      expect(migrationRepository.runMigrations).toHaveBeenCalledTimes(1);
    });
  })

  describe('revertMigrations function should', () => {
    test('call repository revertMigrations function', async () => {
      await migrationInteractor.revertMigrations();
      expect(migrationRepository.revertMigrations).toHaveBeenCalledTimes(1);
    });
  })
})
