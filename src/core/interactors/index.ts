import OperationDataSource from '../../data-sources/OperationDataSource';
import OperationInteractor from './OperationInteractor';
import AuthenticationInteractor from '@core/interactors/AuthenticationInteractor';
import UserDataSource from '../../data-sources/UserDataSource';
import MigrationDataSource from '../../data-sources/MigrationDataSource';
import MigrationInteractor from '@core/interactors/MigrationInteractor';
import WebTokenDataSource from '../../data-sources/WebTokenDataSource';
import WebTokenInteractor from '@core/interactors/WebTokenInteractor';

const operationDataSource = new OperationDataSource();
const operationInteractor = new OperationInteractor(operationDataSource);

const userDataSource = new UserDataSource();
const migrationDataSource = new MigrationDataSource();

const migrationInteractor = new MigrationInteractor(migrationDataSource)
const webTokenDataSource = new WebTokenDataSource();

const webTokenInteractor = new WebTokenInteractor(webTokenDataSource);
const authenticationInteractor = new AuthenticationInteractor(userDataSource, webTokenDataSource)

export {
  operationInteractor,
  authenticationInteractor,
  migrationInteractor,
  webTokenInteractor
};
