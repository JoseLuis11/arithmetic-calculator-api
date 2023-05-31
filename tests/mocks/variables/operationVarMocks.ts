import OperationType from '@core/enums/OperationType';

const operationsMock = [
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

export {
  operationsMock
}
