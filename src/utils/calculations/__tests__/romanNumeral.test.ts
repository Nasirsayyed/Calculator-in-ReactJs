import { describe, expect, it } from 'vitest';
import { fromRoman, toRoman } from '../romanNumeral';

describe('toRoman', () => {
  it('converts known values', () => {
    expect(toRoman(1994)).toBe('MCMXCIV');
    expect(toRoman(58)).toBe('LVIII');
    expect(toRoman(3999)).toBe('MMMCMXCIX');
  });

  it('returns an empty string outside 1-3999', () => {
    expect(toRoman(0)).toBe('');
    expect(toRoman(4000)).toBe('');
    expect(toRoman(1.5)).toBe('');
  });
});

describe('fromRoman', () => {
  it('parses known values', () => {
    expect(fromRoman('MCMXCIV')).toBe(1994);
    expect(fromRoman('LVIII')).toBe(58);
  });

  it('is case-insensitive', () => {
    expect(fromRoman('mcmxciv')).toBe(1994);
  });

  it('returns 0 for invalid input', () => {
    expect(fromRoman('ABC')).toBe(0);
    expect(fromRoman('IIII')).toBe(0);
  });
});
