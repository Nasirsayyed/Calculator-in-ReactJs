import { describe, expect, it } from 'vitest';
import { calculateAverage, parseNumberList } from '../average';

describe('parseNumberList', () => {
  it('parses comma and whitespace separated numbers', () => {
    expect(parseNumberList('1, 2,3  4')).toEqual([1, 2, 3, 4]);
  });

  it('ignores non-numeric tokens', () => {
    expect(parseNumberList('1, abc, 3')).toEqual([1, 3]);
  });
});

describe('calculateAverage', () => {
  it('computes mean, median, min, max, and sum for an odd-length list', () => {
    const result = calculateAverage([1, 2, 3, 4, 5]);
    expect(result.mean).toBe(3);
    expect(result.median).toBe(3);
    expect(result.min).toBe(1);
    expect(result.max).toBe(5);
    expect(result.sum).toBe(15);
    expect(result.count).toBe(5);
  });

  it('averages the two middle values for an even-length list', () => {
    expect(calculateAverage([1, 2, 3, 4]).median).toBe(2.5);
  });

  it('finds the mode when one exists', () => {
    expect(calculateAverage([1, 2, 2, 3]).mode).toEqual([2]);
  });

  it('returns an empty mode when no value repeats', () => {
    expect(calculateAverage([1, 2, 3]).mode).toEqual([]);
  });

  it('returns a zeroed result for an empty list', () => {
    expect(calculateAverage([]).count).toBe(0);
  });
});
