import { describe, expect, it } from 'vitest';
import { calculateGst } from '../gst';

describe('calculateGst', () => {
  it('adds GST on top of an exclusive base amount', () => {
    const result = calculateGst(1000, 18, 'add');
    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBeCloseTo(180, 9);
    expect(result.totalAmount).toBeCloseTo(1180, 9);
  });

  it('extracts GST from an inclusive total amount', () => {
    const result = calculateGst(1180, 18, 'remove');
    expect(result.totalAmount).toBe(1180);
    expect(result.baseAmount).toBeCloseTo(1000, 9);
    expect(result.gstAmount).toBeCloseTo(180, 9);
  });
});
