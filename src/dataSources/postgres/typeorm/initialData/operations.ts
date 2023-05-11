import OperationType from '@core/enums/OperationType';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Operation } from '@entities';

export const initialOperations: QueryDeepPartialEntity<Operation>[] = [
  {
    type: OperationType.ADDITION,
    cost: 100.20
  },
  {
    type: OperationType.DIVISION,
    cost: 401.50
  },
  {
    type: OperationType.MULTIPLICATION,
    cost: 386
  },
  {
    type: OperationType.RANDOM_STRING,
    cost: 1000
  },
  {
    type: OperationType.SQUARE_ROOT,
    cost: 806.10
  },
  {
    type: OperationType.SUBTRACTION,
    cost: 209.76
  }
]
