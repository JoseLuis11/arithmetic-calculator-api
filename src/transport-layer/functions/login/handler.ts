import { successResponse } from '@utils/response';
import { authenticationInteractor } from '@core/interactors';
import { middyfy } from '@utils/middyfy';
import { ValidatedEventAPIGatewayProxyEvent } from '@functions/types/ValidatedEventAPIGatewayProxyEvent';
import schema from '@functions/login/schema';
import User from '@core/entities/User';
import SignedUpUser from '@core/interactors/interfaces/SignedUpUser';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const user: User = { username: event.body.username, password: event.body.password }
  const signedUpUser: SignedUpUser = await authenticationInteractor.login(user);

  return successResponse({
    user: signedUpUser
  });
}

export const main = middyfy(login);
