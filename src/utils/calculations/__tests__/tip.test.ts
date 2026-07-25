import { describe, expect, it } from 'vitest';
import { calculateTip } from '../tip';

describe('calculateTip', () => {
  it('computes tip, total, and per-person split', () => {
    const result = calculateTip(100, 20, 4);
    expect(result.tipAmount).toBe(20);
    expect(result.totalAmount).toBe(120);
    expect(result.perPerson).toBe(30);
  });

  it('treats zero or negative people as a single person', () => {
    const result = calculateTip(100, 10, 0);
    expect(result.perPerson).toBe(result.totalAmount);
  });
});
