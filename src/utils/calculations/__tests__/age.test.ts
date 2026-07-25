import { describe, expect, it } from 'vitest';
import { calculateAge } from '../age';

describe('calculateAge', () => {
  it('computes full years/months/days between two dates', () => {
    const result = calculateAge(new Date(2000, 0, 15), new Date(2024, 5, 10));
    expect(result.years).toBe(24);
    expect(result.months).toBe(4);
    expect(result.days).toBe(26);
  });

  it('handles an exact anniversary with zero months/days', () => {
    const result = calculateAge(new Date(2000, 5, 10), new Date(2024, 5, 10));
    expect(result.years).toBe(24);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
  });

  it('computes total elapsed days', () => {
    const result = calculateAge(new Date(2024, 0, 1), new Date(2024, 0, 11));
    expect(result.totalDays).toBe(10);
  });

  it('returns a zeroed result for a birth date in the future', () => {
    const result = calculateAge(new Date(2999, 0, 1), new Date(2024, 0, 1));
    expect(result).toEqual({ years: 0, months: 0, days: 0, totalDays: 0 });
  });

  it('returns a zeroed result for an invalid date', () => {
    expect(calculateAge(new Date('not-a-date'))).toEqual({
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
    });
  });
});
