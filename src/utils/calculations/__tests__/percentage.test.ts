import { describe, expect, it } from 'vitest';
import { percentageChange, percentageOf, whatPercent } from '../percentage';

describe('percentageOf', () => {
  it('computes percent of a value', () => {
    expect(percentageOf(15, 800)).toBe(120);
    expect(percentageOf(50, 200)).toBe(100);
  });
});

describe('whatPercent', () => {
  it('computes what percent one value is of another', () => {
    expect(whatPercent(40, 200)).toBe(20);
  });

  it('returns 0 when dividing by zero', () => {
    expect(whatPercent(10, 0)).toBe(0);
  });
});

describe('percentageChange', () => {
  it('computes a positive change (increase)', () => {
    expect(percentageChange(100, 120)).toBe(20);
  });

  it('computes a negative change (decrease)', () => {
    expect(percentageChange(100, 80)).toBe(-20);
  });

  it('returns 0 when starting from zero', () => {
    expect(percentageChange(0, 50)).toBe(0);
  });
});
