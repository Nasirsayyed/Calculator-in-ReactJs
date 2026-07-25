import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { simplifyRatio, solveProportion } from '@utils/calculations/ratio';
import { formatNumber } from '@utils/formatNumber';

type SubMode = 'simplify' | 'proportion';

const MODES: { id: SubMode; label: string }[] = [
  { id: 'simplify', label: 'Simplify a:b' },
  { id: 'proportion', label: 'Solve a:b = c:x' },
];

export function RatioPage() {
  const [mode, setMode] = useState<SubMode>('simplify');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');

  const aNum = Number(a) || 0;
  const bNum = Number(b) || 0;
  const cNum = Number(c) || 0;

  const rows =
    mode === 'simplify'
      ? (() => {
          const { a: simplifiedA, b: simplifiedB } = simplifyRatio(aNum, bNum);
          return [
            {
              label: 'Simplified ratio',
              value:
                aNum && bNum
                  ? `${formatNumber(simplifiedA, 4)} : ${formatNumber(simplifiedB, 4)}`
                  : '—',
              emphasis: true,
            },
          ];
        })()
      : [
          {
            label: 'x',
            value: aNum ? formatNumber(solveProportion(aNum, bNum, cNum), 4) : '—',
            emphasis: true,
          },
        ];

  return (
    <FormPage
      title="Ratio Calculator"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Calculation type"
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          <FormField label="a" value={a} onChange={setA} placeholder="0" />
          <FormField label="b" value={b} onChange={setB} placeholder="0" />
          {mode === 'proportion' && (
            <FormField label="c" value={c} onChange={setC} placeholder="0" />
          )}
        </>
      }
      result={<ResultCard rows={rows} />}
    />
  );
}
