import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateMortgage } from '@utils/calculations/mortgage';
import { formatNumber } from '@utils/formatNumber';

export function MortgagePage() {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const { loanAmount, monthlyPayment, totalInterest, totalCost } = calculateMortgage(
    Number(homePrice) || 0,
    Number(downPayment) || 0,
    Number(rate) || 0,
    Number(years) || 0,
  );

  return (
    <FormPage
      title="Mortgage Calculator"
      fields={
        <>
          <FormField label="Home price" value={homePrice} onChange={setHomePrice} placeholder="0" />
          <FormField
            label="Down payment"
            value={downPayment}
            onChange={setDownPayment}
            placeholder="0"
          />
          <FormField
            label="Annual interest rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label="Loan term"
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
            { label: 'Loan amount', value: formatNumber(loanAmount, 2) },
            { label: 'Monthly payment', value: formatNumber(monthlyPayment, 2), emphasis: true },
            { label: 'Total interest', value: formatNumber(totalInterest, 2) },
            { label: 'Total cost', value: formatNumber(totalCost, 2) },
          ]}
        />
      }
    />
  );
}
