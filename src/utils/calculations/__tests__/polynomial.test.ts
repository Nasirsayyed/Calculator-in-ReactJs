import { describe, expect, it } from 'vitest';
import {
  addPolynomials,
  evaluatePolynomial,
  formatPolynomial,
  multiplyPolynomials,
} from '../polynomial';

describe('evaluatePolynomial', () => {
  it('evaluates 2x^2 + 3x + 1 at x=2', () => {
    expect(evaluatePolynomial([1, 3, 2], 2)).toBe(15);
  });
});

describe('addPolynomials', () => {
  it('adds polynomials of different lengths', () => {
    expect(addPolynomials([1, 2], [1, 2, 3])).toEqual([2, 4, 3]);
  });
});

describe('multiplyPolynomials', () => {
  it('multiplies (x + 1) by (x - 1) to get x^2 - 1', () => {
    expect(multiplyPolynomials([1, 1], [-1, 1])).toEqual([-1, 0, 1]);
  });
});

describe('formatPolynomial', () => {
  it('formats a polynomial in descending powers of x', () => {
    expect(formatPolynomial([1, 3, 2])).toBe('2x^2 + 3x + 1');
  });

  it('renders negative terms with a minus sign', () => {
    expect(formatPolynomial([1, -1])).toBe('-x + 1');
  });

  it('formats the zero polynomial', () => {
    expect(formatPolynomial([0])).toBe('0');
  });
});
