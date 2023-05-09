import OperationDataSource from '../../dataSources/OperationDataSource';
import OperationInteractor from './OperationInteractor';

const operationDataSource = new OperationDataSource();
const operationInteractor = new OperationInteractor(operationDataSource);

export { operationInteractor };
