import middy, { MiddlewareObj } from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import TokenUser from '@core/types/TokenUser';
import AuthenticationMiddlewareOptions from './AuthenticationMiddlewareOptions';
import { webTokenInteractor, authenticationInteractor } from '@core/interactors';

const authenticationMiddleware = (authenticationMiddlewareOptions ? : AuthenticationMiddlewareOptions):
  MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const { admittedUserTypes } = authenticationMiddlewareOptions || {};
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<void> => {
    const token = request.event.headers.Authorization?.replace('Bearer ', '') || '';
    const user: TokenUser = webTokenInteractor.verify(token);

    authenticationInteractor.validateTokenUser(admittedUserTypes, user);
  }

  return {
    before
  }
}

export default authenticationMiddleware
