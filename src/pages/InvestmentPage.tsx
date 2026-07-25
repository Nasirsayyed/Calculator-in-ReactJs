import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateInvestment } from '@utils/calculations/investment';
import { formatNumber } from '@utils/formatNumber';

export function InvestmentPage() {
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const { futureValue, totalContributions, totalInterestEarned } = calculateInvestment(
    Number(initial) || 0,
    Number(monthly) || 0,
    Number(rate) || 0,
    Number(years) || 0,
  );

  return (
    <FormPage
      title="Investment Calculator"
      fields={
        <>
          <FormField
            label="Initial investment"
            value={initial}
            onChange={setInitial}
            placeholder="0"
          />
          <FormField
            label="Monthly contribution"
            value={monthly}
            onChange={setMonthly}
            placeholder="0"
          />
          <FormField
            label="Expected annual return"
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label="Duration"
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
            { label: 'Future value', value: formatNumber(futureValue, 2), emphasis: true },
            { label: 'Total contributions', value: formatNumber(totalContributions, 2) },
            { label: 'Interest earned', value: formatNumber(totalInterestEarned, 2) },
          ]}
        />
      }
    />
  );
}
