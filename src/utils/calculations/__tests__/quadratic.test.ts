import { describe, expect, it } from 'vitest';
import { solveQuadratic } from '../quadratic';

describe('solveQuadratic', () => {
  it('finds two distinct real roots when the discriminant is positive', () => {
    const result = solveQuadratic(1, -3, 2);
    expect(result.isComplex).toBe(false);
    expect(result.roots.sort()).toEqual([1, 2]);
  });

  it('finds one repeated root when the discriminant is zero', () => {
    const result = solveQuadratic(1, -2, 1);
    expect(result.discriminant).toBe(0);
    expect(result.roots).toEqual([1]);
  });

  it('returns complex roots when the discriminant is negative', () => {
    const result = solveQuadratic(1, 0, 1);
    expect(result.isComplex).toBe(true);
    expect(result.realPart).toBeCloseTo(0, 10);
    expect(result.imaginaryPart).toBe(1);
  });

  it('falls back to a linear solution when a is 0', () => {
    const result = solveQuadratic(0, 2, -4);
    expect(result.isLinear).toBe(true);
    expect(result.roots).toEqual([2]);
  });
});
