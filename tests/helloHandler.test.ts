import { getGreeting } from '@functions/hello/handler';
import { test, expect, describe } from '@jest/globals';

describe('testing for handler functionality', () => {
  test('correct greeting is generated', () => {
    expect(getGreeting()).toBe('Hello world!')
  })
})
