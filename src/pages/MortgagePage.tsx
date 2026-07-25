import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateMortgage } from '@utils/calculations/mortgage';
import { formatNumber } from '@utils/formatNumber';

export function MortgagePage() {
  const { t } = useTranslation();
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
      title={t('pages.mortgage.title')}
      fields={
        <>
          <FormField
            label={t('pages.mortgage.homePrice')}
            value={homePrice}
            onChange={setHomePrice}
            placeholder="0"
          />
          <FormField
            label={t('pages.mortgage.downPayment')}
            value={downPayment}
            onChange={setDownPayment}
            placeholder="0"
          />
          <FormField
            label={t('pages.mortgage.annualInterestRate')}
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label={t('pages.mortgage.loanTerm')}
            value={years}
            onChange={setYears}
            suffix={t('pages.mortgage.years')}
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.mortgage.loanAmount'), value: formatNumber(loanAmount, 2) },
            {
              label: t('pages.mortgage.monthlyPayment'),
              value: formatNumber(monthlyPayment, 2),
              emphasis: true,
            },
            { label: t('pages.mortgage.totalInterest'), value: formatNumber(totalInterest, 2) },
            { label: t('pages.mortgage.totalCost'), value: formatNumber(totalCost, 2) },
          ]}
        />
      }
    />
  );
}
