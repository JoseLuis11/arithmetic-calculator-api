import { APIGatewayProxyHandler } from 'aws-lambda';
import { successResponse } from '@utils/response';
import { middyfyWithAuthentication } from '@utils/middyfy';
import UserType from '@core/enums/UserType';
import { migrationInteractor } from '@core/interactors';

const revertMigrationsHandler: APIGatewayProxyHandler = async () => {
  await migrationInteractor.revertMigrations();
  return successResponse({
    message: 'If there were any applied migrations, they have been reverted successfully'
  });
}

export const main = middyfyWithAuthentication(revertMigrationsHandler, UserType.ADMIN)
