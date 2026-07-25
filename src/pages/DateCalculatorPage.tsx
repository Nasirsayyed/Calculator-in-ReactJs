import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { addDaysToDate, calculateDateDifference } from '@utils/calculations/dateCalculator';

type SubMode = 'difference' | 'addSubtract';

const MODES: { id: SubMode; label: string }[] = [
  { id: 'difference', label: 'Difference between dates' },
  { id: 'addSubtract', label: 'Add / subtract days' },
];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DateCalculatorPage() {
  const [mode, setMode] = useState<SubMode>('difference');
  const [dateA, setDateA] = useState(today());
  const [dateB, setDateB] = useState(today());
  const [baseDate, setBaseDate] = useState(today());
  const [offsetDays, setOffsetDays] = useState('');

  const diffResult = calculateDateDifference(new Date(dateA), new Date(dateB));
  const resultDate = addDaysToDate(new Date(baseDate), Number(offsetDays) || 0);

  return (
    <FormPage
      title="Date Calculator"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Calculation type"
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          {mode === 'difference' ? (
            <>
              <FormField label="First date" type="date" value={dateA} onChange={setDateA} />
              <FormField label="Second date" type="date" value={dateB} onChange={setDateB} />
            </>
          ) : (
            <>
              <FormField label="Start date" type="date" value={baseDate} onChange={setBaseDate} />
              <FormField
                label="Days to add (negative to subtract)"
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
                label: 'Difference',
                value: `${diffResult.years}y ${diffResult.months}m ${diffResult.days}d`,
                emphasis: true,
              },
              { label: 'Total days', value: diffResult.totalDays.toLocaleString() },
            ]}
          />
        ) : (
          <ResultCard
            rows={[
              {
                label: 'Resulting date',
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
