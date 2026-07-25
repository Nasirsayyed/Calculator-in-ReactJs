import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateCompoundInterest } from '@utils/calculations/compoundInterest';
import { formatNumber } from '@utils/formatNumber';

const FREQUENCIES = [
  { id: '1', label: 'Yearly' },
  { id: '2', label: 'Half-yearly' },
  { id: '4', label: 'Quarterly' },
  { id: '12', label: 'Monthly' },
] as const;

export function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [frequency, setFrequency] = useState<(typeof FREQUENCIES)[number]['id']>('1');

  const { interest, totalAmount } = calculateCompoundInterest(
    Number(principal) || 0,
    Number(rate) || 0,
    Number(years) || 0,
    Number(frequency),
  );

  return (
    <FormPage
      title="Compound Interest Calculator"
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
          <SegmentedControl
            ariaLabel="Compounding frequency"
            options={[...FREQUENCIES]}
            value={frequency}
            onChange={setFrequency}
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
