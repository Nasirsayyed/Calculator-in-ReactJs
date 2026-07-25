import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { TextAreaField } from '@components/common/TextAreaField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateAverage, parseNumberList } from '@utils/calculations/average';
import { formatNumber } from '@utils/formatNumber';

export function AveragePage() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const values = parseNumberList(input);
  const { mean, median, mode, min, max, sum, count } = calculateAverage(values);

  return (
    <FormPage
      title={t('pages.average.title')}
      fields={
        <TextAreaField
          label={t('pages.average.numbers')}
          value={input}
          onChange={setInput}
          placeholder={t('pages.average.placeholderExample')}
        />
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.average.mean'),
              value: count ? formatNumber(mean, 4) : '—',
              emphasis: true,
            },
            { label: t('pages.average.median'), value: count ? formatNumber(median, 4) : '—' },
            {
              label: t('pages.average.mode'),
              value: mode.length ? mode.map((v) => formatNumber(v, 4)).join(', ') : '—',
            },
            { label: t('pages.average.min'), value: count ? formatNumber(min, 4) : '—' },
            { label: t('pages.average.max'), value: count ? formatNumber(max, 4) : '—' },
            { label: t('pages.average.sum'), value: count ? formatNumber(sum, 4) : '—' },
            { label: t('pages.average.count'), value: String(count) },
          ]}
        />
      }
    />
  );
}
