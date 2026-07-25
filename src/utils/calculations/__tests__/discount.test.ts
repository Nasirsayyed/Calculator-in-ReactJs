import { describe, expect, it } from 'vitest';
import { calculateDiscount } from '../discount';

describe('calculateDiscount', () => {
  it('computes the discount amount and final price', () => {
    expect(calculateDiscount(1000, 20)).toEqual({ discountAmount: 200, finalPrice: 800 });
  });

  it('handles a 0% discount', () => {
    expect(calculateDiscount(500, 0)).toEqual({ discountAmount: 0, finalPrice: 500 });
  });

  it('handles a 100% discount', () => {
    expect(calculateDiscount(500, 100)).toEqual({ discountAmount: 500, finalPrice: 0 });
  });
});
