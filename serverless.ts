import type { AWS } from '@serverless/typescript';
import { hello, initializeDatabase, revertMigrations } from '@functions';

const serverlessConfiguration: AWS = {
  service: 'arithmetic-calculator-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_URI: '${env:DB_URI, ssm:aws/reference/secretsmanager/${sls:stage}/postgres-uri}',
    },
  },
  functions: { hello, initializeDatabase, revertMigrations },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      keepNames: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 9000,
      host: '0.0.0.0'
    },
    dotenv: {
      path: '.env.${sls:stage}',
      exclude: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']
    }
  },
};

module.exports = serverlessConfiguration;
