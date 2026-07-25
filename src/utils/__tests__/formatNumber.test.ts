import { describe, expect, it } from 'vitest';
import { formatNumber } from '../formatNumber';

describe('formatNumber', () => {
  it('formats whole and decimal numbers, trimming trailing zeros', () => {
    expect(formatNumber(4)).toBe('4');
    expect(formatNumber(0.5)).toBe('0.5');
    expect(formatNumber(1.5)).toBe('1.5');
  });

  it('formats zero and negative zero as "0"', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(-0)).toBe('0');
  });

  it('rounds to the requested precision', () => {
    expect(formatNumber(1 / 3, 4)).toBe('0.3333');
  });

  it('switches to scientific notation for very large or very small magnitudes', () => {
    expect(formatNumber(1e25)).toMatch(/e\+?25/);
    expect(formatNumber(1e-15)).toMatch(/e-15/);
  });

  it('passes through NaN and Infinity as labeled strings', () => {
    expect(formatNumber(NaN)).toBe('NaN');
    expect(formatNumber(Infinity)).toBe('Infinity');
    expect(formatNumber(-Infinity)).toBe('-Infinity');
  });
});
