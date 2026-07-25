import { describe, expect, it } from 'vitest';
import { calculateStatistics } from '../statistics';

describe('calculateStatistics', () => {
  it('computes mean, range, and variance/std dev for a known set', () => {
    const result = calculateStatistics([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(result.mean).toBe(5);
    expect(result.range).toBe(7);
    expect(result.populationVariance).toBe(4);
    expect(result.populationStdDev).toBe(2);
  });

  it('computes sample variance with Bessel correction', () => {
    const result = calculateStatistics([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(result.sampleVariance).toBeCloseTo((4 * 8) / 7, 6);
  });

  it('returns zeroed stats for a single value', () => {
    const result = calculateStatistics([10]);
    expect(result.mean).toBe(10);
    expect(result.sampleVariance).toBe(0);
    expect(result.populationVariance).toBe(0);
  });

  it('returns an empty result for an empty list', () => {
    expect(calculateStatistics([]).mean).toBe(0);
  });
});
