import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateEmi } from '@utils/calculations/emi';
import { formatNumber } from '@utils/formatNumber';

type TenureUnit = 'years' | 'months';

const TENURE_UNITS: { id: TenureUnit; label: string }[] = [
  { id: 'years', label: 'Years' },
  { id: 'months', label: 'Months' },
];

export function EmiPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>('years');

  const tenureMonths = (Number(tenure) || 0) * (tenureUnit === 'years' ? 12 : 1);
  const { emi, totalPayment, totalInterest } = calculateEmi(
    Number(principal) || 0,
    Number(rate) || 0,
    tenureMonths,
  );

  return (
    <FormPage
      title="EMI Calculator"
      fields={
        <>
          <FormField
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            placeholder="0"
          />
          <FormField
            label="Annual interest rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField label="Tenure" value={tenure} onChange={setTenure} placeholder="0" />
          <SegmentedControl
            ariaLabel="Tenure unit"
            options={TENURE_UNITS}
            value={tenureUnit}
            onChange={setTenureUnit}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'Monthly EMI', value: formatNumber(emi, 2), emphasis: true },
            { label: 'Total interest', value: formatNumber(totalInterest, 2) },
            { label: 'Total payment', value: formatNumber(totalPayment, 2) },
          ]}
        />
      }
    />
  );
}
