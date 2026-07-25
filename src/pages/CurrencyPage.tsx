import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { convertCurrency } from '@utils/calculations/currency';
import { formatNumber } from '@utils/formatNumber';

export function CurrencyPage() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');

  const converted = convertCurrency(Number(amount) || 0, Number(rate) || 0);

  return (
    <FormPage
      title="Currency Calculator"
      fields={
        <>
          <FormField label="Amount" value={amount} onChange={setAmount} placeholder="0" />
          <FormField
            label="Exchange rate (1 unit = ?)"
            value={rate}
            onChange={setRate}
            placeholder="1.00"
          />
        </>
      }
      result={
        <ResultCard
          rows={[{ label: 'Converted amount', value: formatNumber(converted, 4), emphasis: true }]}
        />
      }
    />
  );
}
