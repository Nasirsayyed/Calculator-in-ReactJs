import { describe, expect, it } from 'vitest';
import { evaluateSmartExpression } from '../mathEngine';

describe('evaluateSmartExpression', () => {
  it('evaluates ordinary calculator syntax directly, unchanged', () => {
    const result = evaluateSmartExpression('2+3*4');
    expect(result).toEqual({ ok: true, value: '14', resolvedExpression: '2+3*4' });
  });

  it('falls back to natural-language translation on failure', () => {
    const result = evaluateSmartExpression('what is 15% of 800');
    expect(result.ok).toBe(true);
    expect(result.value).toBe('120');
    expect(result.resolvedExpression).toBe('(15/100)*800');
  });

  it('translates a plain-English addition', () => {
    const result = evaluateSmartExpression('5 plus 3');
    expect(result).toEqual({ ok: true, value: '8', resolvedExpression: '5+3' });
  });

  it('reports the original error when nothing can be understood', () => {
    const result = evaluateSmartExpression('banana');
    expect(result.ok).toBe(false);
    expect(result.resolvedExpression).toBe('banana');
  });

  it('reports the original error for natural language that fails even after translation', () => {
    const result = evaluateSmartExpression('what is the meaning of life');
    expect(result.ok).toBe(false);
    expect(result.resolvedExpression).toBe('what is the meaning of life');
  });
});
