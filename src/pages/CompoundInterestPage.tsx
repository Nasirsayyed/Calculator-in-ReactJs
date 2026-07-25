import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateCompoundInterest } from '@utils/calculations/compoundInterest';
import { formatNumber } from '@utils/formatNumber';

type FrequencyId = '1' | '2' | '4' | '12';

export function CompoundInterestPage() {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [frequency, setFrequency] = useState<FrequencyId>('1');

  const FREQUENCIES: { id: FrequencyId; label: string }[] = [
    { id: '1', label: t('pages.compoundInterest.yearly') },
    { id: '2', label: t('pages.compoundInterest.halfYearly') },
    { id: '4', label: t('pages.compoundInterest.quarterly') },
    { id: '12', label: t('pages.compoundInterest.monthly') },
  ];

  const { interest, totalAmount } = calculateCompoundInterest(
    Number(principal) || 0,
    Number(rate) || 0,
    Number(years) || 0,
    Number(frequency),
  );

  return (
    <FormPage
      title={t('pages.compoundInterest.title')}
      fields={
        <>
          <FormField
            label={t('pages.compoundInterest.principal')}
            value={principal}
            onChange={setPrincipal}
            placeholder="0"
          />
          <FormField
            label={t('pages.compoundInterest.annualRate')}
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label={t('pages.compoundInterest.time')}
            value={years}
            onChange={setYears}
            suffix={t('pages.compoundInterest.years')}
            placeholder="0"
          />
          <SegmentedControl
            ariaLabel={t('pages.compoundInterest.compoundingFrequency')}
            options={FREQUENCIES}
            value={frequency}
            onChange={setFrequency}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.compoundInterest.interest'), value: formatNumber(interest, 2) },
            {
              label: t('pages.compoundInterest.totalAmount'),
              value: formatNumber(totalAmount, 2),
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
