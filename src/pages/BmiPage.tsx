import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateBmiImperial, calculateBmiMetric } from '@utils/calculations/bmi';
import { formatNumber } from '@utils/formatNumber';

type Units = 'metric' | 'imperial';

export function BmiPage() {
  const { t } = useTranslation();
  const [units, setUnits] = useState<Units>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const UNIT_OPTIONS: { id: Units; label: string }[] = [
    { id: 'metric', label: t('pages.bmi.metric') },
    { id: 'imperial', label: t('pages.bmi.imperial') },
  ];

  const { bmi, category } =
    units === 'metric'
      ? calculateBmiMetric(Number(height) || 0, Number(weight) || 0)
      : calculateBmiImperial(Number(height) || 0, Number(weight) || 0);

  return (
    <FormPage
      title={t('pages.bmi.title')}
      fields={
        <>
          <SegmentedControl
            ariaLabel={t('pages.bmi.unitSystem')}
            options={UNIT_OPTIONS}
            value={units}
            onChange={setUnits}
          />
          <FormField
            label={t('pages.bmi.height')}
            value={height}
            onChange={setHeight}
            suffix={units === 'metric' ? 'cm' : 'in'}
            placeholder="0"
          />
          <FormField
            label={t('pages.bmi.weight')}
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
            {
              label: t('pages.bmi.bmi'),
              value: bmi > 0 ? formatNumber(bmi, 1) : '—',
              emphasis: true,
            },
            { label: t('pages.bmi.category'), value: category },
          ]}
        />
      }
    />
  );
}
