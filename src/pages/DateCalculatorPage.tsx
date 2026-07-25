import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { addDaysToDate, calculateDateDifference } from '@utils/calculations/dateCalculator';

type SubMode = 'difference' | 'addSubtract';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DateCalculatorPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<SubMode>('difference');
  const [dateA, setDateA] = useState(today());
  const [dateB, setDateB] = useState(today());
  const [baseDate, setBaseDate] = useState(today());
  const [offsetDays, setOffsetDays] = useState('');

  const diffResult = calculateDateDifference(new Date(dateA), new Date(dateB));
  const resultDate = addDaysToDate(new Date(baseDate), Number(offsetDays) || 0);

  const MODES: { id: SubMode; label: string }[] = [
    { id: 'difference', label: t('pages.dateCalculator.differenceBetweenDates') },
    { id: 'addSubtract', label: t('pages.dateCalculator.addSubtractDays') },
  ];

  return (
    <FormPage
      title={t('pages.dateCalculator.title')}
      fields={
        <>
          <SegmentedControl
            ariaLabel={t('pages.dateCalculator.calculationType')}
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          {mode === 'difference' ? (
            <>
              <FormField
                label={t('pages.dateCalculator.firstDate')}
                type="date"
                value={dateA}
                onChange={setDateA}
              />
              <FormField
                label={t('pages.dateCalculator.secondDate')}
                type="date"
                value={dateB}
                onChange={setDateB}
              />
            </>
          ) : (
            <>
              <FormField
                label={t('pages.dateCalculator.startDate')}
                type="date"
                value={baseDate}
                onChange={setBaseDate}
              />
              <FormField
                label={t('pages.dateCalculator.daysToAdd')}
                value={offsetDays}
                onChange={setOffsetDays}
                placeholder="0"
              />
            </>
          )}
        </>
      }
      result={
        mode === 'difference' ? (
          <ResultCard
            rows={[
              {
                label: t('pages.dateCalculator.difference'),
                value: `${diffResult.years}y ${diffResult.months}m ${diffResult.days}d`,
                emphasis: true,
              },
              {
                label: t('pages.dateCalculator.totalDays'),
                value: diffResult.totalDays.toLocaleString(),
              },
            ]}
          />
        ) : (
          <ResultCard
            rows={[
              {
                label: t('pages.dateCalculator.resultingDate'),
                value: resultDate.toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                emphasis: true,
              },
            ]}
          />
        )
      }
    />
  );
}
