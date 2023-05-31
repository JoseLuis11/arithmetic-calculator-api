import { Operation } from '@entities';
import { operationsMock } from '../variables';

const findAllMock = async (): Promise<Operation[]> => {
  return operationsMock;
}

export {
  findAllMock
}
