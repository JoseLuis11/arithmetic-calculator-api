import UserRepository from '@core/repositories/UserRepository';
import { User } from '@entities';
import bcrypt from 'bcryptjs';
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from '@core/interactors/errors';
import BadRequestErrorMessage from '@core/interactors/enums/BadRequestErrorMessage';
import { userLoggedInValidator, userSignedUpValidator } from '@core/interactors/validators/userSignedUpValidator';
import { getJoiValidationErrorMessage } from '@utils/validationError';
import SignedUpUser from '@core/interactors/interfaces/SignedUpUser';
import UserType from '@core/enums/UserType';
import WebTokenRepository from '@core/repositories/WebTokenRepository';
import NotFoundErrorMessage from '@core/interactors/enums/NotFoundErrorMessage';
import TokenUser from '@core/types/TokenUser';
import ForbiddenErrorMessage from '@core/interactors/enums/ForbiddenErrorMessage';
import UserStatus from '@core/enums/UserStatus';
import UnauthorizedErrorMessage from '@core/interactors/enums/UnauthorizedErrorMessage';

class AuthenticationInteractor {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly webTokenRepository: WebTokenRepository
  ) {}

  public async signup(user: User): Promise<SignedUpUser> {
    await this.validateSignedUpUser(user);
    const hash = await this.hashPassword(user.password);

    const createdUser = await this.userRepository.create(
      {
        username: user.username,
        password: hash,
        type: UserType.USER
      }
    );

    return this.signToken(createdUser)
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  public async login(user: User): Promise<SignedUpUser> {
    this.validateLoggedInUserFields(user);
    const foundUser = await this.getUserByUsername(user.username);
    await this.validatePasswordIsCorrect(user.password, foundUser.password);

    return this.signToken(foundUser);
  }

  private signToken(user: User): SignedUpUser {
    const token = this.webTokenRepository.sign(user);
    return {
      username: user.username,
      balance: Number(user.balance),
      token
    };
  }

  private async validateSignedUpUser(user: User) {
    this.validateSignedUpUserFields(user);
    await this.validateNonexistence(user.username);
  }

  private validateSignedUpUserFields(user: User) {
    const { error } = userSignedUpValidator.validate(user);
    if (error) {
      throw new BadRequestError(getJoiValidationErrorMessage(error));
    }
  }

  private async validateNonexistence(username: string) {
    const foundUser = await this.userRepository.findOneByUsername(username);
    if (foundUser) {
      throw new BadRequestError(BadRequestErrorMessage.USERNAME_ALREADY_EXISTS)
    }
  }

  private validateLoggedInUserFields(user: User) {
    const { error } = userLoggedInValidator.validate(user);
    if (error) {
      throw new BadRequestError(getJoiValidationErrorMessage(error));
    }
  }

  private async getUserByUsername(username: string): Promise<User> {
    const foundUser = await this.userRepository.findOneByUsername(username);
    if (!foundUser) {
      throw new NotFoundError(NotFoundErrorMessage.USER_NOT_EXISTS);
    }
    return foundUser;
  }

  private async validatePasswordIsCorrect(password: string, userPassword: string) {
    const icCorrectPassword = await bcrypt.compare(password, userPassword);

    if (!icCorrectPassword) {
      throw new UnauthorizedError(UnauthorizedErrorMessage.INCORRECT_PASSWORD);
    }
  }

  public validateTokenUser(admittedTypes: UserType | UserType[] | undefined, user: TokenUser) {
    this.validateUserType(admittedTypes, user.type)
    this.validateUserStatus(user.status)
  }

  private validateUserType(admittedTypes: UserType | UserType[] | undefined, userType: UserType) {
    if (admittedTypes) {
      if (Array.isArray(admittedTypes)) {
        if (!admittedTypes.includes(userType)) {
          throw new ForbiddenError(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES)
        }
      } else {
        if (admittedTypes !== userType) {
          throw new ForbiddenError(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES)
        }
      }
    }
  }

  private validateUserStatus(userStatus: UserStatus | undefined) {
    if (userStatus !== UserStatus.ACTIVE) {
      throw new ForbiddenError(ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES)
    }
  }
}

export default AuthenticationInteractor;
