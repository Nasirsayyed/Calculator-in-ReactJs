import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateInvestment } from '@utils/calculations/investment';
import { formatNumber } from '@utils/formatNumber';

export function InvestmentPage() {
  const { t } = useTranslation();
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
      title={t('pages.investment.title')}
      fields={
        <>
          <FormField
            label={t('pages.investment.initialInvestment')}
            value={initial}
            onChange={setInitial}
            placeholder="0"
          />
          <FormField
            label={t('pages.investment.monthlyContribution')}
            value={monthly}
            onChange={setMonthly}
            placeholder="0"
          />
          <FormField
            label={t('pages.investment.expectedAnnualReturn')}
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label={t('pages.investment.duration')}
            value={years}
            onChange={setYears}
            suffix={t('pages.investment.years')}
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.investment.futureValue'),
              value: formatNumber(futureValue, 2),
              emphasis: true,
            },
            {
              label: t('pages.investment.totalContributions'),
              value: formatNumber(totalContributions, 2),
            },
            {
              label: t('pages.investment.interestEarned'),
              value: formatNumber(totalInterestEarned, 2),
            },
          ]}
        />
      }
    />
  );
}
