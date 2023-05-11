const DBOperationHandler = async (dataSource, callback) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  await callback();
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
}

export default DBOperationHandler;
