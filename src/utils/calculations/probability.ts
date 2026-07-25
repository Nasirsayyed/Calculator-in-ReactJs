export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

export function permutations(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

export function combinations(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function eventProbability(favorableOutcomes: number, totalOutcomes: number): number {
  if (totalOutcomes <= 0) return 0;
  return favorableOutcomes / totalOutcomes;
}
