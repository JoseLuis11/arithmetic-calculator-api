import { APIGatewayProxyHandler } from 'aws-lambda';
import { serverErrorResponse, successResponse } from '@utils/response';
import { revertMigrations } from '@utils/DBManager';

export const main: APIGatewayProxyHandler = async () => {
  try {
    await revertMigrations();
    return successResponse({
      message: 'If there were any applied migrations, they have been reverted successfully'
    });
  } catch (e) {
    console.error(e)
    return serverErrorResponse(e)
  }
}
