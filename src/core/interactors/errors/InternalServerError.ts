import HttpError from './HttpError';
import StatusCodes from '../../../transport-layer/enums/statusCodes';

export default class InternalServerError extends HttpError {
  constructor(message) {
    super();
    this.name = 'Internal Server Error';
    this.errorStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message;
  }

}
