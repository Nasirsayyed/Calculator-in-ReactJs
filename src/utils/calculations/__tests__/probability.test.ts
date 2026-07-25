import { describe, expect, it } from 'vitest';
import { combinations, eventProbability, factorial, permutations } from '../probability';

describe('factorial', () => {
  it('computes known factorials', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
  });

  it('returns NaN for negative or non-integer input', () => {
    expect(factorial(-1)).toBeNaN();
    expect(factorial(2.5)).toBeNaN();
  });
});

describe('permutations', () => {
  it('computes nPr', () => {
    expect(permutations(5, 2)).toBe(20);
  });

  it('returns 0 when r exceeds n', () => {
    expect(permutations(2, 5)).toBe(0);
  });
});

describe('combinations', () => {
  it('computes nCr', () => {
    expect(combinations(5, 2)).toBe(10);
  });

  it('is symmetric: nCr === nC(n-r)', () => {
    expect(combinations(6, 2)).toBe(combinations(6, 4));
  });
});

describe('eventProbability', () => {
  it('computes a simple probability', () => {
    expect(eventProbability(1, 6)).toBeCloseTo(0.1667, 3);
  });

  it('returns 0 for zero total outcomes', () => {
    expect(eventProbability(1, 0)).toBe(0);
  });
});
