import { User } from '@entities';
import UserType from '@core/enums/UserType';

type TokenUser = Omit<User, 'password' | 'balance'> & {
  iat: number;
  exp: number;
  type: UserType;
}

export default TokenUser;
