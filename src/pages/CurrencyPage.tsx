import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { convertCurrency } from '@utils/calculations/currency';
import { formatNumber } from '@utils/formatNumber';

export function CurrencyPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');

  const converted = convertCurrency(Number(amount) || 0, Number(rate) || 0);

  return (
    <FormPage
      title={t('pages.currency.title')}
      fields={
        <>
          <FormField
            label={t('pages.currency.amount')}
            value={amount}
            onChange={setAmount}
            placeholder="0"
          />
          <FormField
            label={t('pages.currency.exchangeRate')}
            value={rate}
            onChange={setRate}
            placeholder="1.00"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.currency.convertedAmount'),
              value: formatNumber(converted, 4),
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
