import { expect, describe, test } from 'vitest';

import { Aspect } from '@/core/Aspect';

describe('Aspect', () => {
  test('should create Aspect instance', () => {
    const aspect = new Aspect();
    expect(aspect).toBeInstanceOf(Aspect);
  });
});
