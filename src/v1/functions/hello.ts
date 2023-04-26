import { APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      greeting: getGreeting(),
      method: event.httpMethod
    })
  }
}

const getGreeting = (): string => {
  return 'Hello worlddd!'
}

export { handler, getGreeting };
