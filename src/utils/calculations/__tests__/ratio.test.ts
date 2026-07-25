import { describe, expect, it } from 'vitest';
import { simplifyRatio, solveProportion } from '../ratio';

describe('simplifyRatio', () => {
  it('reduces a ratio to lowest terms', () => {
    expect(simplifyRatio(8, 12)).toEqual({ a: 2, b: 3 });
  });

  it('leaves an already-simplified ratio unchanged', () => {
    expect(simplifyRatio(3, 5)).toEqual({ a: 3, b: 5 });
  });

  it('returns zeros when either term is zero', () => {
    expect(simplifyRatio(0, 5)).toEqual({ a: 0, b: 0 });
  });
});

describe('solveProportion', () => {
  it('solves a:b = c:x for x', () => {
    expect(solveProportion(2, 3, 10)).toBe(15);
  });

  it('returns 0 when a is 0', () => {
    expect(solveProportion(0, 3, 10)).toBe(0);
  });
});
