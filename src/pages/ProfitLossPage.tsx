import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateProfitLoss } from '@utils/calculations/profitLoss';
import { formatNumber } from '@utils/formatNumber';

export function ProfitLossPage() {
  const { t } = useTranslation();
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const { amount, percent, isProfit } = calculateProfitLoss(
    Number(costPrice) || 0,
    Number(sellingPrice) || 0,
  );

  return (
    <FormPage
      title={t('pages.profitLoss.title')}
      fields={
        <>
          <FormField
            label={t('pages.profitLoss.costPrice')}
            value={costPrice}
            onChange={setCostPrice}
            placeholder="0"
          />
          <FormField
            label={t('pages.profitLoss.sellingPrice')}
            value={sellingPrice}
            onChange={setSellingPrice}
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: isProfit ? t('pages.profitLoss.profit') : t('pages.profitLoss.loss'),
              value: formatNumber(amount, 2),
              emphasis: true,
            },
            { label: t('pages.profitLoss.percentage'), value: `${formatNumber(percent, 2)}%` },
          ]}
        />
      }
    />
  );
}
