import { describe, expect, it } from 'vitest';
import { calculateBmiImperial, calculateBmiMetric } from '../bmi';

describe('calculateBmiMetric', () => {
  it('computes BMI and the correct WHO category', () => {
    const result = calculateBmiMetric(180, 70);
    expect(result.bmi).toBeCloseTo(21.6, 1);
    expect(result.category).toBe('Normal');
  });

  it('categorizes underweight, overweight, and obese correctly', () => {
    expect(calculateBmiMetric(180, 50).category).toBe('Underweight');
    expect(calculateBmiMetric(180, 85).category).toBe('Overweight');
    expect(calculateBmiMetric(180, 100).category).toBe('Obese');
  });

  it('returns a neutral result for invalid input', () => {
    expect(calculateBmiMetric(0, 70)).toEqual({ bmi: 0, category: '—' });
    expect(calculateBmiMetric(180, 0)).toEqual({ bmi: 0, category: '—' });
  });
});

describe('calculateBmiImperial', () => {
  it('converts inches/pounds before computing BMI', () => {
    const metric = calculateBmiMetric(180, 70);
    const imperial = calculateBmiImperial(180 / 2.54, 70 / 0.45359237);
    expect(imperial.bmi).toBeCloseTo(metric.bmi, 6);
  });
});
