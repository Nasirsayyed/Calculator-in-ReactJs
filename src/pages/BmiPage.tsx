import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateBmiImperial, calculateBmiMetric } from '@utils/calculations/bmi';
import { formatNumber } from '@utils/formatNumber';

type Units = 'metric' | 'imperial';

const UNIT_OPTIONS: { id: Units; label: string }[] = [
  { id: 'metric', label: 'Metric (cm/kg)' },
  { id: 'imperial', label: 'Imperial (in/lb)' },
];

export function BmiPage() {
  const [units, setUnits] = useState<Units>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const { bmi, category } =
    units === 'metric'
      ? calculateBmiMetric(Number(height) || 0, Number(weight) || 0)
      : calculateBmiImperial(Number(height) || 0, Number(weight) || 0);

  return (
    <FormPage
      title="BMI Calculator"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Unit system"
            options={UNIT_OPTIONS}
            value={units}
            onChange={setUnits}
          />
          <FormField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === 'metric' ? 'cm' : 'in'}
            placeholder="0"
          />
          <FormField
            label="Weight"
            value={weight}
            onChange={setWeight}
            suffix={units === 'metric' ? 'kg' : 'lb'}
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'BMI', value: bmi > 0 ? formatNumber(bmi, 1) : '—', emphasis: true },
            { label: 'Category', value: category },
          ]}
        />
      }
    />
  );
}
