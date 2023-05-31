import WebTokenRepository from '@core/repositories/WebTokenRepository';
import { User } from '@entities';
import TokenUser from '@core/types/TokenUser';
import jwt from 'jsonwebtoken';
import accessEnv from '@utils/accessEnv';
import { UnauthorizedError } from '@core/interactors/errors';
import UnauthorizedErrorMessage from '@core/interactors/enums/UnauthorizedErrorMessage';

class WebTokenDataSource implements WebTokenRepository {
  sign(user: User): string {
    return jwt.sign(
      {
        username: user.username,
        status: user.status,
        type: user.type
      },
      accessEnv('JWT_SECRET'),
      {
        expiresIn: accessEnv('JWT_TOKEN_EXPIRES_IN')
      }
    );
  }

  verify(token: string): TokenUser {
    let jwtUser;
    jwt.verify(token, accessEnv('JWT_SECRET'), (err, user: TokenUser) => {
      if (err) {
        throw new UnauthorizedError(UnauthorizedErrorMessage.UNAUTHORIZED)
      }
      jwtUser = user;
    });
    return jwtUser;
  }

}

export default WebTokenDataSource;
