import { APIGatewayProxyHandler } from 'aws-lambda';
import { serverErrorResponse, successResponse } from '@utils/response';

export const main: APIGatewayProxyHandler = async (event) => {
  try {
    return successResponse({
      greeting: getGreeting(),
      method: event.httpMethod,
    });
  } catch (e) {
    console.error(e)
    return serverErrorResponse(e)
  }
}

export const getGreeting = (): string => {
  return 'Hello world!'
}
