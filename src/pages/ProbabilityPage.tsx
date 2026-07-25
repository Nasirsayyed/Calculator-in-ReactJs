import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { combinations, eventProbability, permutations } from '@utils/calculations/probability';
import { formatNumber } from '@utils/formatNumber';

type SubMode = 'permutation' | 'combination' | 'event';

export function ProbabilityPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<SubMode>('permutation');
  const [n, setN] = useState('');
  const [r, setR] = useState('');

  const MODES: { id: SubMode; label: string }[] = [
    { id: 'permutation', label: t('pages.probability.permutation') },
    { id: 'combination', label: t('pages.probability.combination') },
    { id: 'event', label: t('pages.probability.eventProbability') },
  ];

  const nNum = Number(n) || 0;
  const rNum = Number(r) || 0;

  const rows =
    mode === 'permutation'
      ? [
          {
            label: t('pages.probability.permutationLabel', { n: n || 0, r: r || 0 }),
            value: formatNumber(permutations(nNum, rNum), 0),
            emphasis: true,
          },
        ]
      : mode === 'combination'
        ? [
            {
              label: t('pages.probability.combinationLabel', { n: n || 0, r: r || 0 }),
              value: formatNumber(combinations(nNum, rNum), 0),
              emphasis: true,
            },
          ]
        : [
            {
              label: t('pages.probability.probability'),
              value: `${formatNumber(eventProbability(nNum, rNum) * 100, 4)}%`,
              emphasis: true,
            },
          ];

  return (
    <FormPage
      title={t('pages.probability.title')}
      fields={
        <>
          <SegmentedControl
            ariaLabel={t('pages.probability.calculationType')}
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          <FormField
            label={
              mode === 'event'
                ? t('pages.probability.favorableOutcomes')
                : t('pages.probability.totalItemsN')
            }
            value={n}
            onChange={setN}
            placeholder="0"
          />
          <FormField
            label={
              mode === 'event'
                ? t('pages.probability.totalOutcomes')
                : t('pages.probability.chosenItemsR')
            }
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
