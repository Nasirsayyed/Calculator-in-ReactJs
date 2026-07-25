export interface BmiResult {
  bmi: number;
  category: string;
}

function categorize(bmi: number): string {
  if (!Number.isFinite(bmi) || bmi <= 0) return '—';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateBmiMetric(heightCm: number, weightKg: number): BmiResult {
  if (heightCm <= 0 || weightKg <= 0) return { bmi: 0, category: '—' };
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return { bmi, category: categorize(bmi) };
}

export function calculateBmiImperial(heightIn: number, weightLb: number): BmiResult {
  return calculateBmiMetric(heightIn * 2.54, weightLb * 0.45359237);
}
