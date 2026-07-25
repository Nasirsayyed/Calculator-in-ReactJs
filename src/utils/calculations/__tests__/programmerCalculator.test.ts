import { describe, expect, it } from 'vitest';
import { bitwiseOperate, toAllBases } from '../programmerCalculator';

describe('toAllBases', () => {
  it('converts a decimal value to binary, octal, and hex', () => {
    expect(toAllBases(255)).toEqual({ bin: '11111111', oct: '377', dec: '255', hex: 'FF' });
  });

  it('floors and clamps negative or fractional input to 0', () => {
    expect(toAllBases(-5).dec).toBe('0');
    expect(toAllBases(3.7).dec).toBe('3');
  });
});

describe('bitwiseOperate', () => {
  it('computes AND, OR, and XOR', () => {
    expect(bitwiseOperate(0b1100, 0b1010, 'AND')).toBe(0b1000);
    expect(bitwiseOperate(0b1100, 0b1010, 'OR')).toBe(0b1110);
    expect(bitwiseOperate(0b1100, 0b1010, 'XOR')).toBe(0b0110);
  });

  it('computes NOT as a 32-bit unsigned complement', () => {
    expect(bitwiseOperate(0, 0, 'NOT')).toBe(4294967295);
  });

  it('computes left and right shifts', () => {
    expect(bitwiseOperate(1, 4, 'LSHIFT')).toBe(16);
    expect(bitwiseOperate(16, 4, 'RSHIFT')).toBe(1);
  });
});
