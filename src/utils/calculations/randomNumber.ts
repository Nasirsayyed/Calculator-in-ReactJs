export function generateRandomIntegers(min: number, max: number, count: number): number[] {
  const low = Math.ceil(Math.min(min, max));
  const high = Math.floor(Math.max(min, max));
  const total = Math.max(0, Math.floor(count));

  return Array.from({ length: total }, () => low + Math.floor(Math.random() * (high - low + 1)));
}
