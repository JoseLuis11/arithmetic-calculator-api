import Repository from './Repository';
import Operation from '../entities/Operation';

interface OperationRepository extends Repository<Operation, string>{
  findAll(): Promise<Operation[]>
}

export default OperationRepository;
