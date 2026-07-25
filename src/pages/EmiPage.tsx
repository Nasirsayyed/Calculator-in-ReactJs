import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateEmi } from '@utils/calculations/emi';
import { formatNumber } from '@utils/formatNumber';

type TenureUnit = 'years' | 'months';

export function EmiPage() {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>('years');

  const TENURE_UNITS: { id: TenureUnit; label: string }[] = [
    { id: 'years', label: t('pages.emi.years') },
    { id: 'months', label: t('pages.emi.months') },
  ];

  const tenureMonths = (Number(tenure) || 0) * (tenureUnit === 'years' ? 12 : 1);
  const { emi, totalPayment, totalInterest } = calculateEmi(
    Number(principal) || 0,
    Number(rate) || 0,
    tenureMonths,
  );

  return (
    <FormPage
      title={t('pages.emi.title')}
      fields={
        <>
          <FormField
            label={t('pages.emi.loanAmount')}
            value={principal}
            onChange={setPrincipal}
            placeholder="0"
          />
          <FormField
            label={t('pages.emi.annualInterestRate')}
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label={t('pages.emi.tenure')}
            value={tenure}
            onChange={setTenure}
            placeholder="0"
          />
          <SegmentedControl
            ariaLabel={t('pages.emi.tenureUnit')}
            options={TENURE_UNITS}
            value={tenureUnit}
            onChange={setTenureUnit}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.emi.monthlyEmi'), value: formatNumber(emi, 2), emphasis: true },
            { label: t('pages.emi.totalInterest'), value: formatNumber(totalInterest, 2) },
            { label: t('pages.emi.totalPayment'), value: formatNumber(totalPayment, 2) },
          ]}
        />
      }
    />
  );
}
