import { describe, expect, it } from 'vitest';
import { solveLinearSystem } from '../linearSystem';

describe('solveLinearSystem', () => {
  it('finds a unique solution', () => {
    // x + y = 10, x - y = 2 -> x=6, y=4
    expect(solveLinearSystem(1, 1, 10, 1, -1, 2)).toEqual({ type: 'unique', x: 6, y: 4 });
  });

  it('detects an inconsistent (no solution) system', () => {
    // x + y = 2, x + y = 3
    expect(solveLinearSystem(1, 1, 2, 1, 1, 3)).toEqual({ type: 'none' });
  });

  it('detects infinitely many solutions', () => {
    // x + y = 2, 2x + 2y = 4
    expect(solveLinearSystem(1, 1, 2, 2, 2, 4)).toEqual({ type: 'infinite' });
  });
});
