import HttpError from './HttpError';
import StatusCodes from '../../../transport-layer/enums/statusCodes';
import NotFoundErrorMessage from '@core/interactors/enums/NotFoundErrorMessage';

export default class NotFoundError extends HttpError {
  constructor(notFoundErrorMessage: NotFoundErrorMessage) {
    super();
    this.name = 'Not Found';
    this.errorStatusCode = StatusCodes.NOT_FOUND;
    this.message = notFoundErrorMessage;
  }

}
