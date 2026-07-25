import { describe, expect, it } from 'vitest';
import { convertBase, isValidForBase } from '../baseConverter';

describe('convertBase', () => {
  it('converts decimal to binary', () => {
    expect(convertBase('10', 10, 2)).toBe('1010');
  });

  it('converts hex to decimal', () => {
    expect(convertBase('FF', 16, 10)).toBe('255');
  });

  it('converts binary to octal', () => {
    expect(convertBase('1010', 2, 8)).toBe('12');
  });

  it('returns an empty string for empty or invalid input', () => {
    expect(convertBase('', 10, 2)).toBe('');
    expect(convertBase('ZZZ', 10, 2)).toBe('');
  });
});

describe('isValidForBase', () => {
  it('accepts valid digits for the base', () => {
    expect(isValidForBase('101', 2)).toBe(true);
    expect(isValidForBase('FF', 16)).toBe(true);
  });

  it('rejects digits outside the base', () => {
    expect(isValidForBase('2', 2)).toBe(false);
    expect(isValidForBase('G', 16)).toBe(false);
  });
});
