import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateSplitBill } from '@utils/calculations/splitBill';
import { formatNumber } from '@utils/formatNumber';

export function SplitBillPage() {
  const { t } = useTranslation();
  const [bill, setBill] = useState('');
  const [people, setPeople] = useState('');
  const [tip, setTip] = useState('');

  const { totalWithTip, amountPerPerson, tipAmount } = calculateSplitBill(
    Number(bill) || 0,
    Number(people) || 0,
    Number(tip) || 0,
  );

  return (
    <FormPage
      title={t('pages.splitBill.title')}
      fields={
        <>
          <FormField
            label={t('pages.splitBill.billAmount')}
            value={bill}
            onChange={setBill}
            placeholder="0"
          />
          <FormField
            label={t('pages.splitBill.numberOfPeople')}
            value={people}
            onChange={setPeople}
            placeholder="0"
          />
          <FormField
            label={t('pages.splitBill.tip')}
            value={tip}
            onChange={setTip}
            suffix="%"
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.splitBill.eachPersonPays'),
              value: formatNumber(amountPerPerson, 2),
              emphasis: true,
            },
            { label: t('pages.splitBill.tipAmount'), value: formatNumber(tipAmount, 2) },
            { label: t('pages.splitBill.totalWithTip'), value: formatNumber(totalWithTip, 2) },
          ]}
        />
      }
    />
  );
}
