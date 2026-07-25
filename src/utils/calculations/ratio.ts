function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x || 1;
}

export interface SimplifiedRatio {
  a: number;
  b: number;
}

export function simplifyRatio(a: number, b: number): SimplifiedRatio {
  if (a === 0 || b === 0) return { a: 0, b: 0 };
  const divisor = gcd(a, b);
  return { a: a / divisor, b: b / divisor };
}

/** Solves the proportion a:b = c:x for the missing fourth term x. */
export function solveProportion(a: number, b: number, c: number): number {
  if (a === 0) return 0;
  return (b * c) / a;
}
