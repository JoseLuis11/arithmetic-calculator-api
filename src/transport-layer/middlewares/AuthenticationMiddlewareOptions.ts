import UserType from '@core/enums/UserType';

interface AuthenticationMiddlewareOptions {
  admittedUserTypes?: UserType | UserType[];
}

export default AuthenticationMiddlewareOptions;
