import { describe } from '@jest/globals';
import WebTokenRepository from '@core/repositories/WebTokenRepository';
import WebTokenInteractor from '@core/interactors/WebTokenInteractor';
import TokenUser from '@core/types/TokenUser';
import { tokenUserMock } from './mocks/variables';

describe('web token interactor', () => {
  let webTokenRepository: WebTokenRepository;
  let sut: WebTokenInteractor;
  let tokenUser;

  beforeAll(() => {
    tokenUser = tokenUserMock;
    webTokenRepository = {
      sign: jest.fn(),
      verify: jest.fn((token) => {
        return { username: token, ...tokenUser }
      }),
    }
    sut = new WebTokenInteractor(webTokenRepository);
  });

  it('should verify token successfully', async () => {
    const expected: TokenUser = tokenUserMock;

    const actual = sut.verify('test');

    expect(webTokenRepository.verify).toHaveBeenCalledTimes(1);
    expect(actual).toEqual(expected);
  });
})
