function gcdTwo(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function lcmTwo(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcdTwo(a, b);
}

export interface LcmGcdResult {
  gcd: number;
  lcm: number;
}

export function calculateLcmGcd(numbers: number[]): LcmGcdResult {
  const values = numbers.filter((value) => Number.isFinite(value) && value !== 0);
  if (values.length === 0) return { gcd: 0, lcm: 0 };

  return {
    gcd: values.reduce((acc, value) => gcdTwo(acc, value)),
    lcm: values.reduce((acc, value) => lcmTwo(acc, value)),
  };
}
