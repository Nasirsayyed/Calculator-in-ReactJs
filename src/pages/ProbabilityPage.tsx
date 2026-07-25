import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { combinations, eventProbability, permutations } from '@utils/calculations/probability';
import { formatNumber } from '@utils/formatNumber';

type SubMode = 'permutation' | 'combination' | 'event';

const MODES: { id: SubMode; label: string }[] = [
  { id: 'permutation', label: 'nPr' },
  { id: 'combination', label: 'nCr' },
  { id: 'event', label: 'Event probability' },
];

export function ProbabilityPage() {
  const [mode, setMode] = useState<SubMode>('permutation');
  const [n, setN] = useState('');
  const [r, setR] = useState('');

  const nNum = Number(n) || 0;
  const rNum = Number(r) || 0;

  const rows =
    mode === 'permutation'
      ? [
          {
            label: `P(${n || 0}, ${r || 0})`,
            value: formatNumber(permutations(nNum, rNum), 0),
            emphasis: true,
          },
        ]
      : mode === 'combination'
        ? [
            {
              label: `C(${n || 0}, ${r || 0})`,
              value: formatNumber(combinations(nNum, rNum), 0),
              emphasis: true,
            },
          ]
        : [
            {
              label: 'Probability',
              value: `${formatNumber(eventProbability(nNum, rNum) * 100, 4)}%`,
              emphasis: true,
            },
          ];

  return (
    <FormPage
      title="Probability Calculator"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Calculation type"
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          <FormField
            label={mode === 'event' ? 'Favorable outcomes' : 'n (total items)'}
            value={n}
            onChange={setN}
            placeholder="0"
          />
          <FormField
            label={mode === 'event' ? 'Total outcomes' : 'r (chosen items)'}
            value={r}
            onChange={setR}
            placeholder="0"
          />
        </>
      }
      result={<ResultCard rows={rows} />}
    />
  );
}
