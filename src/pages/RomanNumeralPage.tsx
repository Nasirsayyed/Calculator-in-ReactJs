import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { fromRoman, toRoman } from '@utils/calculations/romanNumeral';

type SubMode = 'toRoman' | 'fromRoman';

export function RomanNumeralPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<SubMode>('toRoman');
  const [number, setNumber] = useState('');
  const [roman, setRoman] = useState('');

  const MODES: { id: SubMode; label: string }[] = [
    { id: 'toRoman', label: t('pages.romanNumeral.numberToRoman') },
    { id: 'fromRoman', label: t('pages.romanNumeral.romanToNumber') },
  ];

  const rows =
    mode === 'toRoman'
      ? [
          {
            label: t('pages.romanNumeral.romanNumeralResultLabel'),
            value: number ? toRoman(Number(number)) || t('pages.romanNumeral.outOfRange') : '—',
            emphasis: true,
          },
        ]
      : [
          {
            label: t('pages.romanNumeral.numberResultLabel'),
            value: roman ? String(fromRoman(roman) || t('pages.romanNumeral.invalid')) : '—',
            emphasis: true,
          },
        ];

  return (
    <FormPage
      title={t('pages.romanNumeral.title')}
      fields={
        <>
          <SegmentedControl
            ariaLabel={t('pages.romanNumeral.direction')}
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          {mode === 'toRoman' ? (
            <FormField
              label={t('pages.romanNumeral.numberInput')}
              value={number}
              onChange={setNumber}
              placeholder="0"
            />
          ) : (
            <FormField
              label={t('pages.romanNumeral.romanNumeralInput')}
              type="text"
              value={roman}
              onChange={setRoman}
              placeholder={t('pages.romanNumeral.romanNumeralPlaceholder')}
            />
          )}
        </>
      }
      result={<ResultCard rows={rows} />}
    />
  );
}
