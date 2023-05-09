import Response from '../transport-layer/model/Response';
import StatusCodes from '../transport-layer/enums/statusCodes';

const successResponse = (response): Response => {
  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify({ ...response }),
  }
}

const serverErrorResponse = (error): Response => {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: JSON.stringify({
      error: error.message
    })
  }
}

export { successResponse, serverErrorResponse }
