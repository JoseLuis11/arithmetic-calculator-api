import Response from '../transport-layer/interfaces/Response';
import StatusCodes from '../transport-layer/enums/statusCodes';
import HttpError from '@core/interactors/errors/HttpError';

const successResponse = (response: object): Response => {
  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify({ ...response }),
  }
}

const errorResponse = (error: HttpError): Response => {
  return {
    statusCode: error.errorStatusCode,
    body: JSON.stringify({
      name: error.name,
      message: error.message
    })
  }
}

export { successResponse, errorResponse }
