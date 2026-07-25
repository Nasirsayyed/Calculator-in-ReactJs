import { describe, expect, it } from 'vitest';
import { calculateMargin } from '../margin';

describe('calculateMargin', () => {
  it('computes gross margin and markup for a profitable sale', () => {
    const result = calculateMargin(80, 100);
    expect(result.profit).toBe(20);
    expect(result.grossMarginPercent).toBe(20);
    expect(result.markupPercent).toBe(25);
  });

  it('handles zero revenue and zero cost without dividing by zero', () => {
    expect(calculateMargin(50, 0).grossMarginPercent).toBe(0);
    expect(calculateMargin(0, 50).markupPercent).toBe(0);
  });
});
