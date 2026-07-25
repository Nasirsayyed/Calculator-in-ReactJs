import { describe, expect, it } from 'vitest';
import { calculateSplitBill } from '../splitBill';

describe('calculateSplitBill', () => {
  it('splits a bill with tip evenly', () => {
    const result = calculateSplitBill(100, 4, 10);
    expect(result.tipAmount).toBe(10);
    expect(result.totalWithTip).toBe(110);
    expect(result.amountPerPerson).toBe(27.5);
  });

  it('handles zero tip', () => {
    const result = calculateSplitBill(60, 3, 0);
    expect(result.amountPerPerson).toBe(20);
  });

  it('returns zeros for invalid inputs', () => {
    expect(calculateSplitBill(0, 4, 10)).toEqual({
      totalWithTip: 0,
      amountPerPerson: 0,
      tipAmount: 0,
    });
    expect(calculateSplitBill(100, 0, 10)).toEqual({
      totalWithTip: 0,
      amountPerPerson: 0,
      tipAmount: 0,
    });
  });
});
