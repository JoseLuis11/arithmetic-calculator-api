import { APIGatewayProxyHandler } from 'aws-lambda';
import { serverErrorResponse, successResponse } from '@utils/response';
import { runMigrations } from '@utils/DBManager';

export const main: APIGatewayProxyHandler = async () => {
  try {
    await runMigrations();
    return successResponse({
      message: 'If there were any pending migrations, they have been applied successfully'
    });
  } catch (e) {
    console.error(e)
    return serverErrorResponse(e)
  }
}
