import { describe, expect, it } from 'vitest';
import { addVectors, crossProduct, dotProduct, magnitude, subtractVectors } from '../vector';

describe('addVectors / subtractVectors', () => {
  it('adds and subtracts component-wise', () => {
    expect(addVectors([1, 2, 3], [4, 5, 6])).toEqual([5, 7, 9]);
    expect(subtractVectors([4, 5, 6], [1, 2, 3])).toEqual([3, 3, 3]);
  });
});

describe('dotProduct', () => {
  it('computes the dot product', () => {
    expect(dotProduct([1, 2, 3], [4, 5, 6])).toBe(32);
  });
});

describe('crossProduct', () => {
  it('computes the cross product of two 3D vectors', () => {
    expect(crossProduct([1, 0, 0], [0, 1, 0])).toEqual([0, 0, 1]);
  });

  it('throws for non-3D vectors', () => {
    expect(() => crossProduct([1, 2], [3, 4])).toThrow();
  });
});

describe('magnitude', () => {
  it('computes the Euclidean norm', () => {
    expect(magnitude([3, 4])).toBe(5);
  });
});
