import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { percentageChange, percentageOf, whatPercent } from '@utils/calculations/percentage';
import { formatNumber } from '@utils/formatNumber';

type SubMode = 'of' | 'is' | 'change';

export function PercentagePage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<SubMode>('of');
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const MODES: { id: SubMode; label: string }[] = [
    { id: 'of', label: t('pages.percentage.modeOf') },
    { id: 'is', label: t('pages.percentage.modeIs') },
    { id: 'change', label: t('pages.percentage.modeChange') },
  ];

  const xNum = Number(x) || 0;
  const yNum = Number(y) || 0;

  const rows =
    mode === 'of'
      ? [
          {
            label: t('pages.percentage.ofResultLabel', { x: x || 0, y: y || 0 }),
            value: formatNumber(percentageOf(xNum, yNum), 2),
            emphasis: true,
          },
        ]
      : mode === 'is'
        ? [
            {
              label: t('pages.percentage.percentOfLabel', { x: x || 0, y: y || 0 }),
              value: `${formatNumber(whatPercent(xNum, yNum), 2)}%`,
              emphasis: true,
            },
          ]
        : [
            {
              label: t('pages.percentage.changeLabel', { x: x || 0, y: y || 0 }),
              value: `${formatNumber(percentageChange(xNum, yNum), 2)}%`,
              emphasis: true,
            },
          ];

  return (
    <FormPage
      title={t('pages.percentage.title')}
      fields={
        <>
          <SegmentedControl
            ariaLabel={t('pages.percentage.calculationType')}
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          <FormField
            label={
              mode === 'change' ? t('pages.percentage.fromValue') : t('pages.percentage.valueX')
            }
            value={x}
            onChange={setX}
            placeholder="0"
          />
          <FormField
            label={
              mode === 'change' ? t('pages.percentage.toValue') : t('pages.percentage.ofValueY')
            }
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
