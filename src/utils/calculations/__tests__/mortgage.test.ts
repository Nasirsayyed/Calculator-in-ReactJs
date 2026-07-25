import { describe, expect, it } from 'vitest';
import { calculateMortgage } from '../mortgage';

describe('calculateMortgage', () => {
  it('subtracts the down payment before amortizing', () => {
    const result = calculateMortgage(300000, 60000, 6, 30);
    expect(result.loanAmount).toBe(240000);
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalCost).toBeCloseTo(60000 + result.monthlyPayment * 360, 4);
  });

  it('handles a fully paid down payment', () => {
    const result = calculateMortgage(200000, 200000, 5, 15);
    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPayment).toBe(0);
    expect(result.totalCost).toBe(200000);
  });

  it('handles a 0% interest rate', () => {
    const result = calculateMortgage(120000, 0, 0, 10);
    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
  });
});
