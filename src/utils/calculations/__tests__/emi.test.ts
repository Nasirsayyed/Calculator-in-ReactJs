import { describe, expect, it } from 'vitest';
import { calculateEmi } from '../emi';

describe('calculateEmi', () => {
  it('computes a known EMI value', () => {
    // 1,00,000 loan at 10% annual for 12 months -> EMI ~ 8791.59
    const result = calculateEmi(100000, 10, 12);
    expect(result.emi).toBeCloseTo(8791.59, 1);
    expect(result.totalPayment).toBeCloseTo(result.emi * 12, 6);
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 100000, 6);
  });

  it('handles a 0% interest rate as a plain division', () => {
    const result = calculateEmi(12000, 0, 12);
    expect(result.emi).toBe(1000);
    expect(result.totalInterest).toBe(0);
  });

  it('returns zeros for invalid principal or tenure', () => {
    expect(calculateEmi(0, 10, 12)).toEqual({ emi: 0, totalPayment: 0, totalInterest: 0 });
    expect(calculateEmi(1000, 10, 0)).toEqual({ emi: 0, totalPayment: 0, totalInterest: 0 });
  });
});
