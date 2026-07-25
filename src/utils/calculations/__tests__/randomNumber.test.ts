import { describe, expect, it } from 'vitest';
import { generateRandomIntegers } from '../randomNumber';

describe('generateRandomIntegers', () => {
  it('generates the requested count of integers within range', () => {
    const results = generateRandomIntegers(1, 6, 20);
    expect(results).toHaveLength(20);
    for (const value of results) {
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  });

  it('handles min/max given in reverse order', () => {
    const results = generateRandomIntegers(10, 1, 5);
    for (const value of results) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(10);
    }
  });

  it('returns an empty array for a zero or negative count', () => {
    expect(generateRandomIntegers(1, 10, 0)).toEqual([]);
    expect(generateRandomIntegers(1, 10, -3)).toEqual([]);
  });
});
