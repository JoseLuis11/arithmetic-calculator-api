import { APIGatewayProxyHandler } from 'aws-lambda';
import { successResponse } from '@utils/response';
import { middyfyWithAuthentication } from '@utils/middyfy';
import UserType from '@core/enums/UserType';
import { migrationInteractor } from '@core/interactors';

const runMigrationsHandler: APIGatewayProxyHandler = async () => {
  await migrationInteractor.runMigrations();
  return successResponse({
    message: 'If there were any pending migrations, they have been applied successfully'
  });
}

export const main = middyfyWithAuthentication(runMigrationsHandler, UserType.ADMIN);
