import OperationRepository from '../repositories/OperationRepository';
import Operation from '../entities/Operation';

class OperationInteractor {
  constructor(public readonly operationRepository: OperationRepository) {
  }

  public async findAll(): Promise<Operation[]> {
    return await this.operationRepository.findAll({});
  }
}

export default OperationInteractor;
