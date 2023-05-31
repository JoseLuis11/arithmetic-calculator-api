import TokenUser from '@core/types/TokenUser';
import UserType from '@core/enums/UserType';
import UserStatus from '@core/enums/UserStatus';
import { User } from '@entities';

const tokenUserMock: TokenUser = {
  username: 'test',
  type: UserType.USER,
  status: UserStatus.ACTIVE,
  iat: 1,
  exp: 2
}

const userToBeLoggedInMock: User = {
  username: 'test@test.com',
  password: 'testPassword'
}

const userToBeSignedUpMock: User = {
  ...userToBeLoggedInMock
}

export {
  tokenUserMock,
  userToBeSignedUpMock,
  userToBeLoggedInMock
};
