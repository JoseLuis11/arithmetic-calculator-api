import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*Interactor.ts'
  ],
  coverageThreshold: {
    global: {},
    './src/**/*Interactor.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
}

export default config;
