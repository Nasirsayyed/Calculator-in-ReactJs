import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { fromRoman, toRoman } from '@utils/calculations/romanNumeral';

type SubMode = 'toRoman' | 'fromRoman';

const MODES: { id: SubMode; label: string }[] = [
  { id: 'toRoman', label: 'Number → Roman' },
  { id: 'fromRoman', label: 'Roman → Number' },
];

export function RomanNumeralPage() {
  const [mode, setMode] = useState<SubMode>('toRoman');
  const [number, setNumber] = useState('');
  const [roman, setRoman] = useState('');

  const rows =
    mode === 'toRoman'
      ? [
          {
            label: 'Roman numeral',
            value: number ? toRoman(Number(number)) || 'Out of range (1-3999)' : '—',
            emphasis: true,
          },
        ]
      : [
          {
            label: 'Number',
            value: roman ? String(fromRoman(roman) || 'Invalid') : '—',
            emphasis: true,
          },
        ];

  return (
    <FormPage
      title="Roman Numeral Converter"
      fields={
        <>
          <SegmentedControl ariaLabel="Direction" options={MODES} value={mode} onChange={setMode} />
          {mode === 'toRoman' ? (
            <FormField
              label="Number (1-3999)"
              value={number}
              onChange={setNumber}
              placeholder="0"
            />
          ) : (
            <FormField
              label="Roman numeral"
              type="text"
              value={roman}
              onChange={setRoman}
              placeholder="e.g. MCMXCIV"
            />
          )}
        </>
      }
      result={<ResultCard rows={rows} />}
    />
  );
}
