import { APIGatewayProxyHandler } from 'aws-lambda';

export const main: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      greeting: getGreeting(),
      method: event.httpMethod
    })
  }
}

export const getGreeting = (): string => {
  return 'Hello world!'
}
