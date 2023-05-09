import Repository from './Repository';
import Operation from '../entities/Operation';

interface OperationRepository extends Repository<Operation, string>{
  findAll(options: object): Promise<Operation[]>
}

export default OperationRepository;
