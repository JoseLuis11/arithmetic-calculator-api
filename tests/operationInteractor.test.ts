import OperationInteractor from '@core/interactors/OperationInteractor';
import OperationRepository from '@core/repositories/OperationRepository';
import { findAllMock } from './mocks/functions';
import { operationsMock } from './mocks/variables';
import { Operation } from '@entities';

describe('operation interactor test suite', () => {
  describe('findAll function should', () => {
    let sut: OperationInteractor;
    let operationRepository: OperationRepository;

    beforeEach(() => {
      operationRepository = {
        findAll: jest.fn(findAllMock)
      }

      sut = new OperationInteractor(operationRepository);
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    test('return operations list', async () => {
      const expected: Operation[] = operationsMock;
      const actual = await sut.findAll();

      expect(actual).toEqual(expected);
    })

    test('call operationRepository findAll function', async () => {
      await sut.findAll();
      expect(operationRepository.findAll).toHaveBeenCalledTimes(1);
    })
  });
})
