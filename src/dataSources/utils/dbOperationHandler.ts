const DBOperationHandler = async (dataSource, callback) => {
  if (dataSource.isInitialized) {
    console.info('database is already initialized')
  } else {
    await dataSource.initialize();
  }
  await callback();
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
}

export default DBOperationHandler;
