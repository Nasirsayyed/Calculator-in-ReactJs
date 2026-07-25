import { describe, expect, it } from 'vitest';
import { addMatrices, determinant, multiplyMatrices, subtractMatrices, transpose } from '../matrix';

describe('addMatrices / subtractMatrices', () => {
  it('adds and subtracts matrices element-wise', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(addMatrices(a, b)).toEqual([
      [6, 8],
      [10, 12],
    ]);
    expect(subtractMatrices(a, b)).toEqual([
      [-4, -4],
      [-4, -4],
    ]);
  });

  it('throws on mismatched dimensions', () => {
    expect(() => addMatrices([[1]], [[1, 2]])).toThrow();
  });
});

describe('multiplyMatrices', () => {
  it('multiplies compatible matrices', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(multiplyMatrices(a, b)).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  it('throws when inner dimensions do not match', () => {
    expect(() => multiplyMatrices([[1, 2]], [[1, 2]])).toThrow();
  });
});

describe('transpose', () => {
  it('flips rows and columns', () => {
    expect(
      transpose([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });
});

describe('determinant', () => {
  it('computes a 2x2 determinant', () => {
    expect(
      determinant([
        [1, 2],
        [3, 4],
      ]),
    ).toBe(-2);
  });

  it('computes a 3x3 determinant', () => {
    expect(
      determinant([
        [6, 1, 1],
        [4, -2, 5],
        [2, 8, 7],
      ]),
    ).toBe(-306);
  });

  it('throws for a non-square matrix', () => {
    expect(() => determinant([[1, 2]])).toThrow();
  });
});
