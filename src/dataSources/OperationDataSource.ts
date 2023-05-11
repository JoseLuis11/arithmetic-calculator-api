import OperationRepository from '../core/repositories/OperationRepository';
import Operation from '../core/entities/Operation';
import OperationSchema from './postgres/typeorm/schemas/OperationSchema';
import { Repository } from 'typeorm';
import postgresDataSource from './postgres/connection';
import DBOperationHandler from './utils/dbOperationHandler';

class OperationDataSource implements OperationRepository {
  repository: Repository<Operation>;

  constructor() {
      this.repository = postgresDataSource.getRepository<Operation>(OperationSchema)
  }

  async findAll(options: object): Promise<Operation[]> {
    let operations;
    console.info(options)
    await DBOperationHandler(postgresDataSource, async () => {
      operations = await this.repository.find();
    })
    return operations;
  }
}

export default OperationDataSource;
