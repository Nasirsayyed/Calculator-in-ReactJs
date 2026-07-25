import { describe, expect, it } from 'vitest';
import { convertCurrency } from '../currency';

describe('convertCurrency', () => {
  it('multiplies the amount by the exchange rate', () => {
    expect(convertCurrency(100, 0.85)).toBe(85);
  });

  it('returns 0 for a 0 amount', () => {
    expect(convertCurrency(0, 1.5)).toBe(0);
  });
});
