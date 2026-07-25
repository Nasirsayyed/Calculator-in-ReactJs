export interface AverageResult {
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  sum: number;
  count: number;
}

const EMPTY_RESULT: AverageResult = {
  mean: 0,
  median: 0,
  mode: [],
  min: 0,
  max: 0,
  sum: 0,
  count: 0,
};

export function parseNumberList(input: string): number[] {
  return input
    .split(/[,\s]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
    .map(Number)
    .filter((value) => !Number.isNaN(value));
}

export function calculateAverage(values: number[]): AverageResult {
  if (values.length === 0) return EMPTY_RESULT;

  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((total, value) => total + value, 0);
  const mean = sum / values.length;

  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!;

  const frequency = new Map<number, number>();
  for (const value of values) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1);
  }
  const maxFrequency = Math.max(...frequency.values());
  const mode =
    maxFrequency > 1
      ? [...frequency.entries()]
          .filter(([, count]) => count === maxFrequency)
          .map(([value]) => value)
      : [];

  return {
    mean,
    median,
    mode,
    min: sorted[0]!,
    max: sorted.at(-1)!,
    sum,
    count: values.length,
  };
}
