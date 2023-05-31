import HttpError from './HttpError';
import StatusCodes from '../../../transport-layer/enums/statusCodes';
import UnauthorizedErrorMessage from '@core/interactors/enums/UnauthorizedErrorMessage';

export default class UnauthorizedError extends HttpError {
  constructor(unauthorizedErrorMessage: UnauthorizedErrorMessage) {
    super();
    this.name = 'Unauthorized';
    this.errorStatusCode = StatusCodes.UNAUTHORIZED;
    this.message = unauthorizedErrorMessage;
  }

}
