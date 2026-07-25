import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateSimpleInterest } from '@utils/calculations/simpleInterest';
import { formatNumber } from '@utils/formatNumber';

export function SimpleInterestPage() {
  const { t } = useTranslation();
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
      title={t('pages.simpleInterest.title')}
      fields={
        <>
          <FormField
            label={t('pages.simpleInterest.principal')}
            value={principal}
            onChange={setPrincipal}
            placeholder="0"
          />
          <FormField
            label={t('pages.simpleInterest.annualRate')}
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label={t('pages.simpleInterest.time')}
            value={years}
            onChange={setYears}
            suffix={t('pages.simpleInterest.years')}
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.simpleInterest.interest'), value: formatNumber(interest, 2) },
            {
              label: t('pages.simpleInterest.totalAmount'),
              value: formatNumber(totalAmount, 2),
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
