interface MigrationRepository {
  runMigrations(): Promise<void>;
  revertMigrations(): Promise<void>;
}

export default MigrationRepository;
