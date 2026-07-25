import { describe, expect, it } from 'vitest';
import { addDaysToDate, calculateDateDifference } from '../dateCalculator';

describe('calculateDateDifference', () => {
  it('computes the difference regardless of argument order', () => {
    const a = new Date(2020, 0, 1);
    const b = new Date(2024, 5, 15);
    const forward = calculateDateDifference(a, b);
    const backward = calculateDateDifference(b, a);
    expect(forward).toEqual(backward);
    expect(forward.years).toBe(4);
    expect(forward.months).toBe(5);
    expect(forward.days).toBe(14);
  });

  it('computes total days for a known range', () => {
    const result = calculateDateDifference(new Date(2024, 0, 1), new Date(2024, 0, 11));
    expect(result.totalDays).toBe(10);
  });

  it('returns zeros for an invalid date', () => {
    expect(calculateDateDifference(new Date('invalid'), new Date()).totalDays).toBe(0);
  });
});

describe('addDaysToDate', () => {
  it('adds positive days', () => {
    const result = addDaysToDate(new Date(2024, 0, 1), 10);
    expect(result.getDate()).toBe(11);
  });

  it('subtracts when given a negative number', () => {
    const result = addDaysToDate(new Date(2024, 0, 11), -10);
    expect(result.getDate()).toBe(1);
  });

  it('rolls over into the next month', () => {
    const result = addDaysToDate(new Date(2024, 0, 31), 1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(1);
  });
});
