import { User } from '@entities';
import { userToBeLoggedInMock } from '../variables';

const createUserMock = async (user: User): Promise<User> => {
  return {
    username: user.username,
    password: 'hashedPassword',
    balance: 5000
  }
}

const findUserByUsernameMock = async (): Promise<User> => {
  return {
    ...userToBeLoggedInMock,
    balance: 5000
  }
}

const signTokenMock = () => 'token';

const hashMock = async (passwordString) => `hashed${passwordString}`;

export {
  createUserMock,
  signTokenMock,
  hashMock,
  findUserByUsernameMock,
  userToBeLoggedInMock
}
