import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import authenticationMiddleware from '../transport-layer/middlewares/authenticationMiddleware';
import errorManagementMiddleware from '../transport-layer/middlewares/errorManagementMiddleware';
import UserType from '@core/enums/UserType';

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(errorManagementMiddleware());
}

export const middyfyWithAuthentication = (handler, admittedUserTypes? : UserType | UserType[]) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(authenticationMiddleware({ admittedUserTypes: admittedUserTypes }))
    .use(errorManagementMiddleware());
}
