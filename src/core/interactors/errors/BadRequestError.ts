import HttpError from './HttpError';
import StatusCodes from '../../../transport-layer/enums/statusCodes';
import BadRequestErrorMessage from '@core/interactors/enums/BadRequestErrorMessage';

export default class BadRequestError extends HttpError {
  constructor(badRequestErrorMessage: BadRequestErrorMessage | string) {
    super();
    this.name = 'Bad Request';
    this.errorStatusCode = StatusCodes.BAD_REQUEST;
    this.message = badRequestErrorMessage;
  }

}

