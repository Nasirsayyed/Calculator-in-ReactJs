import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateMargin } from '@utils/calculations/margin';
import { formatNumber } from '@utils/formatNumber';

export function MarginPage() {
  const { t } = useTranslation();
  const [cost, setCost] = useState('');
  const [revenue, setRevenue] = useState('');

  const { profit, grossMarginPercent, markupPercent } = calculateMargin(
    Number(cost) || 0,
    Number(revenue) || 0,
  );

  return (
    <FormPage
      title={t('pages.margin.title')}
      fields={
        <>
          <FormField
            label={t('pages.margin.cost')}
            value={cost}
            onChange={setCost}
            placeholder="0"
          />
          <FormField
            label={t('pages.margin.revenue')}
            value={revenue}
            onChange={setRevenue}
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.margin.profit'), value: formatNumber(profit, 2) },
            {
              label: t('pages.margin.grossMargin'),
              value: `${formatNumber(grossMarginPercent, 2)}%`,
              emphasis: true,
            },
            { label: t('pages.margin.markup'), value: `${formatNumber(markupPercent, 2)}%` },
          ]}
        />
      }
    />
  );
}
