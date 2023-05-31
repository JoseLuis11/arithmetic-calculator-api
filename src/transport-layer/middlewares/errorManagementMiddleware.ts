import { MiddlewareObj } from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { errorResponse } from '@utils/response';
import HttpError from '@core/interactors/errors/HttpError';
import { InternalServerError } from '@core/interactors/errors';

const errorManagementMiddleware  = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError = async (request) => {
    let error;
    if (request.error instanceof HttpError) {
      error = request.error;
      console.error(`${error.name}: ${error.message}`)
    } else {
      console.error(request.error)

      error = new InternalServerError(request.error.message)
      console.error(error)
    }
    return errorResponse(error);
  }

  return {
    onError
  }
}

export default errorManagementMiddleware;
