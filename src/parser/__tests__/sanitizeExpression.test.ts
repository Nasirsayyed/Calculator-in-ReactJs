import { describe, expect, it } from 'vitest';
import { sanitizeExpression } from '../sanitizeExpression';

describe('sanitizeExpression', () => {
  it('normalizes unicode operators to mathjs syntax', () => {
    expect(sanitizeExpression('2×3÷4−1')).toEqual({ ok: true, expression: '2*3/4-1' });
  });

  it('converts π to pi and √ to sqrt', () => {
    expect(sanitizeExpression('π')).toEqual({ ok: true, expression: 'pi' });
    expect(sanitizeExpression('√9')).toEqual({ ok: true, expression: 'sqrt(9)' });
    expect(sanitizeExpression('√(9+7)')).toEqual({ ok: true, expression: 'sqrt(9+7)' });
  });

  it('rejects quote characters outright', () => {
    const result = sanitizeExpression('"1+1"');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/invalid characters/i);
  });

  it('rejects semicolons and backslashes', () => {
    expect(sanitizeExpression('1+1;2+2').ok).toBe(false);
    expect(sanitizeExpression('1+1\\2').ok).toBe(false);
  });

  it('flags unbalanced parentheses', () => {
    expect(sanitizeExpression('(1+2').ok).toBe(false);
    expect(sanitizeExpression('1+2)').ok).toBe(false);
  });

  it('passes through an empty string as ok with empty expression', () => {
    expect(sanitizeExpression('   ')).toEqual({ ok: true, expression: '' });
  });
});
