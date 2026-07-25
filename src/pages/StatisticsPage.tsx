import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { TextAreaField } from '@components/common/TextAreaField';
import { ResultCard } from '@components/common/ResultCard';
import { parseNumberList } from '@utils/calculations/average';
import { calculateStatistics } from '@utils/calculations/statistics';
import { formatNumber } from '@utils/formatNumber';

export function StatisticsPage() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const values = parseNumberList(input);
  const { mean, range, populationVariance, populationStdDev, sampleVariance, sampleStdDev } =
    calculateStatistics(values);
  const hasResult = values.length > 0;

  return (
    <FormPage
      title={t('pages.statistics.title')}
      fields={
        <TextAreaField
          label={t('pages.statistics.numbers')}
          value={input}
          onChange={setInput}
          placeholder={t('pages.statistics.placeholderExample')}
        />
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.statistics.mean'),
              value: hasResult ? formatNumber(mean, 4) : '—',
              emphasis: true,
            },
            { label: t('pages.statistics.range'), value: hasResult ? formatNumber(range, 4) : '—' },
            {
              label: t('pages.statistics.stdDevPopulation'),
              value: hasResult ? formatNumber(populationStdDev, 4) : '—',
            },
            {
              label: t('pages.statistics.variancePopulation'),
              value: hasResult ? formatNumber(populationVariance, 4) : '—',
            },
            {
              label: t('pages.statistics.stdDevSample'),
              value: hasResult ? formatNumber(sampleStdDev, 4) : '—',
            },
            {
              label: t('pages.statistics.varianceSample'),
              value: hasResult ? formatNumber(sampleVariance, 4) : '—',
            },
          ]}
        />
      }
    />
  );
}
