import { describe, expect, it } from 'vitest';
import { calculateLoan } from '../loan';

describe('calculateLoan', () => {
  it('matches the EMI formula for monthly payment', () => {
    const result = calculateLoan(100000, 10, 1);
    expect(result.monthlyPayment).toBeCloseTo(8791.59, 1);
    expect(result.totalPayment).toBeCloseTo(result.monthlyPayment * 12, 6);
  });

  it('produces a yearly breakdown that fully amortizes the balance', () => {
    const result = calculateLoan(100000, 8, 2);
    expect(result.yearlyBreakdown).toHaveLength(2);
    expect(result.yearlyBreakdown.at(-1)!.remainingBalance).toBeCloseTo(0, 4);
  });

  it('handles a 0% interest rate as a plain division', () => {
    const result = calculateLoan(12000, 0, 1);
    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
  });

  it('returns zeros for invalid principal or tenure', () => {
    expect(calculateLoan(0, 10, 1).monthlyPayment).toBe(0);
    expect(calculateLoan(1000, 10, 0).yearlyBreakdown).toEqual([]);
  });
});
