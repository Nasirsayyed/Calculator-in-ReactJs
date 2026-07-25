import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateTip } from '@utils/calculations/tip';
import { formatNumber } from '@utils/formatNumber';

export function TipPage() {
  const { t } = useTranslation();
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');

  const { tipAmount, totalAmount, perPerson } = calculateTip(
    Number(bill) || 0,
    Number(tipPercent) || 0,
    Number(people) || 1,
  );

  return (
    <FormPage
      title={t('pages.tip.title')}
      fields={
        <>
          <FormField
            label={t('pages.tip.billAmount')}
            value={bill}
            onChange={setBill}
            placeholder="0"
          />
          <FormField
            label={t('pages.tip.tip')}
            value={tipPercent}
            onChange={setTipPercent}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label={t('pages.tip.splitBetween')}
            value={people}
            onChange={setPeople}
            suffix={t('pages.tip.people')}
            min={1}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.tip.tipAmount'), value: formatNumber(tipAmount, 2) },
            { label: t('pages.tip.totalBill'), value: formatNumber(totalAmount, 2) },
            { label: t('pages.tip.perPerson'), value: formatNumber(perPerson, 2), emphasis: true },
          ]}
        />
      }
    />
  );
}
