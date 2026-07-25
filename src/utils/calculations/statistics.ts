export interface StatisticsResult {
  mean: number;
  range: number;
  populationVariance: number;
  populationStdDev: number;
  sampleVariance: number;
  sampleStdDev: number;
}

const EMPTY_RESULT: StatisticsResult = {
  mean: 0,
  range: 0,
  populationVariance: 0,
  populationStdDev: 0,
  sampleVariance: 0,
  sampleStdDev: 0,
};

export function calculateStatistics(values: number[]): StatisticsResult {
  if (values.length === 0) return EMPTY_RESULT;

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const range = Math.max(...values) - Math.min(...values);
  const squaredDiffs = values.map((value) => (value - mean) ** 2);
  const sumSquaredDiffs = squaredDiffs.reduce((sum, value) => sum + value, 0);

  const populationVariance = sumSquaredDiffs / values.length;
  const sampleVariance = values.length > 1 ? sumSquaredDiffs / (values.length - 1) : 0;

  return {
    mean,
    range,
    populationVariance,
    populationStdDev: Math.sqrt(populationVariance),
    sampleVariance,
    sampleStdDev: Math.sqrt(sampleVariance),
  };
}
