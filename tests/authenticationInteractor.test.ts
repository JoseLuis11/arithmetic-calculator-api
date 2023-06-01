import { describe } from '@jest/globals';
import UserType from '@core/enums/UserType';
import ForbiddenErrorMessage from '@core/interactors/enums/ForbiddenErrorMessage';
import UserStatus from '@core/enums/UserStatus';
import WebTokenRepository from '@core/repositories/WebTokenRepository';
import UserRepository from '@core/repositories/UserRepository';
import AuthenticationInteractor from '@core/interactors/AuthenticationInteractor';
import { tokenUserMock, userToBeLoggedInMock, userToBeSignedUpMock } from './mocks/variables';
import bcrypt from 'bcryptjs';
import SignedUpUser from '@core/interactors/interfaces/SignedUpUser';
import {
  createUserMock,
  findUserByUsernameMock,
  hashMock,
  signTokenMock
} from './mocks/functions';
import { User } from '@entities';
import BadRequestErrorMessage from '@core/interactors/enums/BadRequestErrorMessage';
import NotFoundErrorMessage from '@core/interactors/enums/NotFoundErrorMessage';
import UnauthorizedErrorMessage from '@core/interactors/enums/UnauthorizedErrorMessage';

describe('authentication interactor test suite', () => {
  describe('signup function should', () => {
    let userRepository: UserRepository;
    let sut: AuthenticationInteractor;

    beforeEach(() => {
      userRepository = {
        create: jest.fn(createUserMock),
        findOneByUsername: jest.fn()
      }
      const webTokenRepository: WebTokenRepository = {
        sign: jest.fn(signTokenMock),
        verify: jest.fn(),
      }

      sut = new AuthenticationInteractor(userRepository, webTokenRepository);
      jest.spyOn(bcrypt, 'hash').mockImplementation(hashMock);
    })

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('return correct information with token when signup successfully', async () => {
      const expected: SignedUpUser = {
        username: 'test@test.com',
        balance: 5000,
        token: 'token'
      }
      const actual = await sut.signup(userToBeSignedUpMock);
      expect(actual).toEqual(expected);
    })

    test('call hashPassword function to get the hashed password', async () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'hashPassword')
      await sut.signup(userToBeSignedUpMock);
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test('call userRepository create function to create the user', async () => {
      await sut.signup(userToBeSignedUpMock);
      expect(userRepository.create).toHaveBeenCalledTimes(1)
    })

    test('call signToken function', async () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'signToken');
      await sut.signup(userToBeSignedUpMock);
      expect(spy).toHaveBeenCalledTimes(1);
    })

    test('call validateSignedUpUser function', async () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'validateSignedUpUser')
      await sut.signup(userToBeSignedUpMock);
      expect(spy).toHaveBeenCalledTimes(1);
    })

    test('throw "username" must be a valid email error when a proper email is not sent as username', async () => {
      await expect(sut.signup({ username: 'a', password: 'test' }))
        .rejects.toThrow('"username" must be a valid email')
    })

    test(`throw "password" length must be at least ${process.env.PASSWORD_MIN} characters long" error ` +
      'when the password length is less than PASSWORD_MIN env variable', async () => {
        await expect(sut.signup({ username: 'test@test.com', password: 'test' }))
          .rejects.toThrow(`"password" length must be at least ${process.env.PASSWORD_MIN} characters long`)
    })

    test(`throw "password" length must be less than or equal to ${process.env.PASSWORD_MAX} characters long" error ` +
      'when the password length is more than PASSWORD_MAX env variable', async () => {
      await expect(sut.signup({
        username: 'test@test.com',
        password: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }))
        .rejects.toThrow(`"password" length must be less than or equal to ${process.env.PASSWORD_MAX} characters long`)
    })

    test(`throw "password" length must be less than or equal to ${process.env.PASSWORD_MAX} characters long" error ` +
      'when the password length is more than PASSWORD_MAX env using emojis', async () => {
      await expect(sut.signup({
        username: 'test@test.com',
        password: '😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊'
      }))
        .rejects.toThrow(`"password" length must be less than or equal to ${process.env.PASSWORD_MAX} characters long`)
    })

    test('throw Username already exists error when user is found from userRepository', async () => {
      jest.spyOn(userRepository, 'findOneByUsername')
        .mockImplementation(async (username: string): Promise<User | null> => {
          return { username: username, password: 'pass' }
        });
      await expect(sut.signup(userToBeSignedUpMock)).rejects.toThrow(BadRequestErrorMessage.USERNAME_ALREADY_EXISTS)
    })
  })

  describe('login function should', () => {
    let userRepository: UserRepository;
    let webTokenRepository: WebTokenRepository;
    let sut: AuthenticationInteractor;

    beforeEach(() => {
      userRepository = {
        create: jest.fn(),
        findOneByUsername: jest.fn(findUserByUsernameMock)
      }
      webTokenRepository = {
        sign: jest.fn(signTokenMock),
        verify: jest.fn(),
      }
      sut = new AuthenticationInteractor(userRepository, webTokenRepository);
      jest.spyOn(bcrypt, 'compare').mockReturnValue(true);
    })

    afterEach(() => {
      jest.resetAllMocks();
    })

    test('return correct information with token when login successfully', async () => {
      const expected: SignedUpUser = {
        username: 'test@test.com',
        balance: 5000,
        token: 'token'
      }
      const actual = await sut.login(userToBeLoggedInMock);
      expect(actual).toEqual(expected);
    })

    test('call validateLoggedInUserFields function', async () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'validateLoggedInUserFields');
      await sut.login(userToBeLoggedInMock);
      expect(spy).toHaveBeenCalledTimes(1);
    })

    test('throw "username" must be a valid email error when an incorrect username is sent', async () => {
      await expect(sut.login({ username: 'a', password: 'test' }))
        .rejects.toThrow('"username" must be a valid email');
    })

    test('throw "username" is not allowed to be empty error when an empty username is sent', async () => {
      await expect(sut.login({ username: '', password: 'test' }))
        .rejects.toThrow('"username" is not allowed to be empty');
    })

    test('throw "password" is not allowed to be empty error when an empty password is sent', async () => {
      await expect(sut.login({ username: 'test@test.com', password: '' }))
        .rejects.toThrow('"password" is not allowed to be empty');
    })

    test('call getUserByUsername function', async () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'getUserByUsername');
      await sut.login(userToBeLoggedInMock);
      expect(spy).toHaveBeenCalledTimes(1);
    })

    test('throw Username does not exist error when a user is not found with the provided username', async () => {
      jest.spyOn(userRepository, 'findOneByUsername')
        .mockImplementation(async () => null)
      await expect(sut.login(userToBeLoggedInMock))
        .rejects.toThrow(NotFoundErrorMessage.USER_NOT_EXISTS);
    })

    test('call validatePasswordIsCorrect function', async () => {
      const spy = jest
        .spyOn(AuthenticationInteractor.prototype as never, 'validatePasswordIsCorrect');
      await sut.login(userToBeLoggedInMock);
      expect(spy).toHaveBeenCalledTimes(1);
    })

    test('throw Password is not correct error when bcrypt compare function returns false for the password comparison',
      async () => {
        jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
        await expect(sut.login(userToBeLoggedInMock))
          .rejects.toThrow(UnauthorizedErrorMessage.INCORRECT_PASSWORD);
    });

    test('call signToken function', async () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'signToken');
      await sut.login(userToBeLoggedInMock);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateTokenUser function should', () => {
    let sut: AuthenticationInteractor;

    beforeEach(() => {
      const userRepository: UserRepository = {
        create: jest.fn(),
        findOneByUsername: jest.fn()
      }
      const webTokenRepository: WebTokenRepository = {
        sign: jest.fn(),
        verify: jest.fn(),
      }
      sut = new AuthenticationInteractor(userRepository, webTokenRepository);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('call validateUserType function', () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'validateUserType');
      sut.validateTokenUser(UserType.USER, tokenUserMock);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('validate single admitted user type with success', () => {
      expect(() => sut.validateTokenUser(UserType.USER, tokenUserMock))
        .not.toThrow(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES);
    });

    test('validate admitted user types array with success', () => {
      expect(() => sut.validateTokenUser([UserType.USER, UserType.ADMIN], tokenUserMock))
        .not.toThrow(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES);
    });

    test('throw Forbidden Error when passing single admitted user type and wrong user type', () => {
      expect(() => sut.validateTokenUser(UserType.ADMIN, tokenUserMock))
        .toThrow(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES);
    });

    test('throw Forbidden Error when passing admitted user types array and wrong user type', () => {
      expect(() => sut.validateTokenUser([UserType.ADMIN], tokenUserMock))
        .toThrow(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES);
    });

    test('call validateUserStatus function', () => {
      const spy = jest.spyOn(AuthenticationInteractor.prototype as never, 'validateUserStatus');
      sut.validateTokenUser(UserType.USER, tokenUserMock);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('validate when user status is active correctly', () => {
      expect(() => sut.validateTokenUser(UserType.USER, tokenUserMock))
        .not.toThrow(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES);
    })

    test('throw Forbidden Error when user status is undefined', () => {
      expect(() => sut.validateTokenUser(UserType.USER, { ...tokenUserMock, status: undefined }))
        .toThrow(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES);
    })

    test('throw Forbidden Error when user status is inactive', () => {
      expect(() => sut.validateTokenUser(UserType.USER, { ...tokenUserMock, status: UserStatus.INACTIVE }))
        .toThrow(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES);
    })
  });
})
