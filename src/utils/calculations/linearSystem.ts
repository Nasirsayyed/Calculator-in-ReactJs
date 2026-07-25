export type LinearSystemSolution =
  { type: 'unique'; x: number; y: number } | { type: 'none' } | { type: 'infinite' };

/** Solves the 2x2 linear system a1*x + b1*y = c1, a2*x + b2*y = c2 via Cramer's rule. */
export function solveLinearSystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number,
): LinearSystemSolution {
  const determinant = a1 * b2 - a2 * b1;

  if (determinant !== 0) {
    return {
      type: 'unique',
      x: (c1 * b2 - c2 * b1) / determinant,
      y: (a1 * c2 - a2 * c1) / determinant,
    };
  }

  const determinantX = c1 * b2 - c2 * b1;
  const determinantY = a1 * c2 - a2 * c1;
  return determinantX === 0 && determinantY === 0 ? { type: 'infinite' } : { type: 'none' };
}
