import { describe, expect, it } from 'vitest';
import { calculateLcmGcd } from '../lcmGcd';

describe('calculateLcmGcd', () => {
  it('computes GCD and LCM for two numbers', () => {
    expect(calculateLcmGcd([12, 18])).toEqual({ gcd: 6, lcm: 36 });
  });

  it('computes GCD and LCM across more than two numbers', () => {
    expect(calculateLcmGcd([4, 6, 8])).toEqual({ gcd: 2, lcm: 24 });
  });

  it('ignores zeros in the input', () => {
    expect(calculateLcmGcd([0, 5, 10])).toEqual({ gcd: 5, lcm: 10 });
  });

  it('returns zeros for an empty or all-zero input', () => {
    expect(calculateLcmGcd([])).toEqual({ gcd: 0, lcm: 0 });
    expect(calculateLcmGcd([0, 0])).toEqual({ gcd: 0, lcm: 0 });
  });
});
