import MigrationRepository from '@core/repositories/MigrationRepository';

class MigrationInteractor {
  constructor(private readonly migrationRepository: MigrationRepository) {
  }

  public async runMigrations(): Promise<void> {
    return await this.migrationRepository.runMigrations();
  }

  public async revertMigrations(): Promise<void> {
    return await this.migrationRepository.revertMigrations();
  }
}

export default MigrationInteractor;
