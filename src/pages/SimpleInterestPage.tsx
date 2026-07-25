import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateSimpleInterest } from '@utils/calculations/simpleInterest';
import { formatNumber } from '@utils/formatNumber';

export function SimpleInterestPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const { interest, totalAmount } = calculateSimpleInterest(
    Number(principal) || 0,
    Number(rate) || 0,
    Number(years) || 0,
  );

  return (
    <FormPage
      title="Simple Interest Calculator"
      fields={
        <>
          <FormField label="Principal" value={principal} onChange={setPrincipal} placeholder="0" />
          <FormField
            label="Annual rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label="Time"
            value={years}
            onChange={setYears}
            suffix="years"
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'Interest', value: formatNumber(interest, 2) },
            { label: 'Total amount', value: formatNumber(totalAmount, 2), emphasis: true },
          ]}
        />
      }
    />
  );
}
