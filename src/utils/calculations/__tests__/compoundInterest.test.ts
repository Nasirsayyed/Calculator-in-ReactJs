import { describe, expect, it } from 'vitest';
import { calculateCompoundInterest } from '../compoundInterest';

describe('calculateCompoundInterest', () => {
  it('matches a known compound interest result (annual compounding)', () => {
    const result = calculateCompoundInterest(10000, 10, 2, 1);
    expect(result.totalAmount).toBeCloseTo(12100, 2);
    expect(result.interest).toBeCloseTo(2100, 2);
  });

  it('produces more interest with more frequent compounding', () => {
    const annual = calculateCompoundInterest(10000, 10, 5, 1);
    const monthly = calculateCompoundInterest(10000, 10, 5, 12);
    expect(monthly.totalAmount).toBeGreaterThan(annual.totalAmount);
  });

  it('treats a non-positive compounding frequency as annual', () => {
    const zero = calculateCompoundInterest(10000, 10, 2, 0);
    const annual = calculateCompoundInterest(10000, 10, 2, 1);
    expect(zero.totalAmount).toBeCloseTo(annual.totalAmount, 9);
  });
});
