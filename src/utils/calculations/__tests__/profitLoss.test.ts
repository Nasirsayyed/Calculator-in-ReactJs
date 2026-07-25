import { describe, expect, it } from 'vitest';
import { calculateProfitLoss } from '../profitLoss';

describe('calculateProfitLoss', () => {
  it('detects a profit', () => {
    const result = calculateProfitLoss(100, 150);
    expect(result.isProfit).toBe(true);
    expect(result.amount).toBe(50);
    expect(result.percent).toBe(50);
  });

  it('detects a loss', () => {
    const result = calculateProfitLoss(200, 150);
    expect(result.isProfit).toBe(false);
    expect(result.amount).toBe(50);
    expect(result.percent).toBe(25);
  });

  it('handles a zero cost price without dividing by zero', () => {
    const result = calculateProfitLoss(0, 100);
    expect(result.percent).toBe(0);
  });
});
