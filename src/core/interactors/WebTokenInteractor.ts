import WebTokenRepository from '@core/repositories/WebTokenRepository';
import TokenUser from '../types/TokenUser';

class WebTokenInteractor {

  constructor(private readonly webTokenRepository: WebTokenRepository) {
  }

  public verify(token: string): TokenUser {
    return this.webTokenRepository.verify(token);
  }
}

export default WebTokenInteractor;
