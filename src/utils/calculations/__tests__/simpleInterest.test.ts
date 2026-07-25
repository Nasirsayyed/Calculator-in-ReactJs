import { describe, expect, it } from 'vitest';
import { calculateSimpleInterest } from '../simpleInterest';

describe('calculateSimpleInterest', () => {
  it('computes simple interest and total amount', () => {
    const result = calculateSimpleInterest(10000, 5, 2);
    expect(result.interest).toBe(1000);
    expect(result.totalAmount).toBe(11000);
  });

  it('returns zero interest for zero rate or time', () => {
    expect(calculateSimpleInterest(1000, 0, 5).interest).toBe(0);
    expect(calculateSimpleInterest(1000, 5, 0).interest).toBe(0);
  });
});
