import accessEnv from '@utils/accessEnv';
import { errorResponse, successResponse } from '@utils/response';
import Response from '../src/transport-layer/interfaces/Response';
import StatusCodes from '../src/transport-layer/enums/statusCodes';
import UnauthorizedErrorMessage from '@core/interactors/enums/UnauthorizedErrorMessage';
import NotFoundErrorMessage from '@core/interactors/enums/NotFoundErrorMessage';
import ForbiddenErrorMessage from '@core/interactors/enums/ForbiddenErrorMessage';
import {
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  BadRequestError
} from '@core/interactors/errors';

describe('utils test suite', () => {
  describe('accessing env should', () => {
    let sut;
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();

      sut = accessEnv;
      process.env = {
        ...originalEnv,
        DB_URI: 'db uri'
      }
    })

    afterEach(() => {
      process.env = originalEnv;
    });

    test('return DB_URI env variable when is defined in env.process correctly', () => {
      const expected = 'db uri';
      const actual = sut('DB_URI');
      expect(actual).toBe(expected);
    });

    test('should throw not found in process.env error when passing an unknown variable', () => {
      expect(() => sut('UNKNOWN_VAR')).toThrow('UNKNOWN_VAR not found in process.env')
    });
  });

  describe('returning responses', () => {
    describe('success response', () => {
      it('should return right success response', function () {
        const expected: Response = {
          statusCode: StatusCodes.OK,
          body: '{"test":"this is for testing purposes"}'
        }
        const actual = successResponse({ test: 'this is for testing purposes' })
        expect(actual).toEqual(expected);
      });
    })

    describe('error response', () => {
      let sut;

      beforeEach(() => {
        sut = errorResponse;
      })

      it.each([
        {
          expected: {
            statusCode: StatusCodes.BAD_REQUEST,
            body: '{"name":"Bad Request","message":"Bad request error from testing"}'
          },
          error: BadRequestError,
          errorMessage: 'Bad request error from testing',
          errorName: 'BadRequestError'
        },
        {
          expected: {
            statusCode: StatusCodes.UNAUTHORIZED,
            body: '{"name":"Unauthorized","message":"User not authorized to perform this action"}'
          },
          error: UnauthorizedError,
          errorMessage: UnauthorizedErrorMessage.UNAUTHORIZED,
          errorName: 'UnauthorizedError'
        },
        {
          expected: {
            statusCode: StatusCodes.NOT_FOUND,
            body: '{"name":"Not Found","message":"Username does not exist"}'
          },
          error: NotFoundError,
          errorMessage: NotFoundErrorMessage.USER_NOT_EXISTS,
          errorName: 'NotFoundError'
        },
        {
          expected: {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            body: '{"name":"Internal Server Error","message":"Internal server error from testing"}'
          },
          error: InternalServerError,
          errorMessage: 'Internal server error from testing',
          errorName: 'InternalServerError'
        },
        {
          expected: {
            statusCode: StatusCodes.FORBIDDEN,
            body: '{"name":"Forbidden","message":"User does not have enough privileges to perform this action"}'
          },
          error: ForbiddenError,
          errorMessage: ForbiddenErrorMessage.NOT_ENOUGH_PRIVILEGES,
          errorName: 'ForbiddenError'
        },
      ])('should return right $errorName response', ({ expected, error, errorMessage }) => {
        const actual = sut(new error(errorMessage));
        expect(actual).toEqual(expected);
      })
    })
  })
})
