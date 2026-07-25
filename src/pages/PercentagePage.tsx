import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { percentageChange, percentageOf, whatPercent } from '@utils/calculations/percentage';
import { formatNumber } from '@utils/formatNumber';

type SubMode = 'of' | 'is' | 'change';

const MODES: { id: SubMode; label: string }[] = [
  { id: 'of', label: 'X% of Y' },
  { id: 'is', label: 'X is what % of Y' },
  { id: 'change', label: '% change' },
];

export function PercentagePage() {
  const [mode, setMode] = useState<SubMode>('of');
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const xNum = Number(x) || 0;
  const yNum = Number(y) || 0;

  const rows =
    mode === 'of'
      ? [
          {
            label: `${x || 0}% of ${y || 0}`,
            value: formatNumber(percentageOf(xNum, yNum), 2),
            emphasis: true,
          },
        ]
      : mode === 'is'
        ? [
            {
              label: `${x || 0} as a % of ${y || 0}`,
              value: `${formatNumber(whatPercent(xNum, yNum), 2)}%`,
              emphasis: true,
            },
          ]
        : [
            {
              label: `Change from ${x || 0} to ${y || 0}`,
              value: `${formatNumber(percentageChange(xNum, yNum), 2)}%`,
              emphasis: true,
            },
          ];

  return (
    <FormPage
      title="Percentage Calculator"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Calculation type"
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          <FormField
            label={mode === 'change' ? 'From value' : 'Value (X)'}
            value={x}
            onChange={setX}
            placeholder="0"
          />
          <FormField
            label={mode === 'change' ? 'To value' : 'Of value (Y)'}
            value={y}
            onChange={setY}
            placeholder="0"
          />
        </>
      }
      result={<ResultCard rows={rows} />}
    />
  );
}
