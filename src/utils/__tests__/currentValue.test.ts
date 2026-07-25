import { describe, expect, it } from 'vitest';
import { getCurrentNumericValue } from '../currentValue';

describe('getCurrentNumericValue', () => {
  it('prefers the evaluated result when justEvaluated is true', () => {
    const value = getCurrentNumericValue({
      justEvaluated: true,
      result: '42',
      preview: '999',
      expression: '1+1',
    });
    expect(value).toBe(42);
  });

  it('falls back to the live preview while typing', () => {
    const value = getCurrentNumericValue({
      justEvaluated: false,
      result: '',
      preview: '7',
      expression: '3+4',
    });
    expect(value).toBe(7);
  });

  it('falls back to the raw expression when there is no preview', () => {
    const value = getCurrentNumericValue({
      justEvaluated: false,
      result: '',
      preview: '',
      expression: '9',
    });
    expect(value).toBe(9);
  });

  it('returns null when there is nothing usable', () => {
    expect(
      getCurrentNumericValue({ justEvaluated: false, result: '', preview: '', expression: '' }),
    ).toBeNull();
  });

  it('returns null for a non-numeric expression', () => {
    expect(
      getCurrentNumericValue({ justEvaluated: false, result: '', preview: '', expression: 'sin(' }),
    ).toBeNull();
  });
});
