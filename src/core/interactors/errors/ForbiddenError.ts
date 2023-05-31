import HttpError from './HttpError';
import StatusCodes from '../../../transport-layer/enums/statusCodes';
import ForbiddenErrorMessage from '@core/interactors/enums/ForbiddenErrorMessage';

export default class ForbiddenError extends HttpError {
  constructor(forbiddenErrorMessage: ForbiddenErrorMessage) {
    super();
    this.name = 'Forbidden';
    this.errorStatusCode = StatusCodes.FORBIDDEN;
    this.message = forbiddenErrorMessage;
  }

}
