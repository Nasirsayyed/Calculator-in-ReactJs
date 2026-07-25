import { describe, expect, it } from 'vitest';
import { calculateInvestment } from '../investment';

describe('calculateInvestment', () => {
  it('grows a lump sum with compound interest and no contributions', () => {
    const result = calculateInvestment(1000, 0, 12, 1);
    expect(result.futureValue).toBeCloseTo(1000 * Math.pow(1 + 0.01, 12), 4);
    expect(result.totalContributions).toBe(1000);
  });

  it('adds monthly contributions on top of the initial amount', () => {
    const result = calculateInvestment(0, 100, 0, 1);
    expect(result.futureValue).toBeCloseTo(1200, 6);
    expect(result.totalContributions).toBe(1200);
    expect(result.totalInterestEarned).toBeCloseTo(0, 6);
  });

  it('reports positive interest earned when rate is positive', () => {
    const result = calculateInvestment(5000, 200, 8, 10);
    expect(result.totalInterestEarned).toBeGreaterThan(0);
    expect(result.futureValue).toBeCloseTo(
      result.totalContributions + result.totalInterestEarned,
      6,
    );
  });

  it('returns the initial amount for zero duration', () => {
    expect(calculateInvestment(500, 100, 5, 0)).toEqual({
      futureValue: 500,
      totalContributions: 500,
      totalInterestEarned: 0,
    });
  });
});
