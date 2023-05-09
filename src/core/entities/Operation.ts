import Entity from './Entity';
import OperationType from '../enums/OperationType';

interface Operation extends Entity {
  type: OperationType;
  cost: number
}

export default Operation;
