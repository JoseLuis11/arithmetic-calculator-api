import { getGreeting } from '../src/v1/functions/hello';
import { test, expect, describe } from '@jest/globals';

describe('testing for handler functionality', () => {
    test('correct greeting is generated', () => {
        expect(getGreeting()).toBe('Hello world!')
    })
})
