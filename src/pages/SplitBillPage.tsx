import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateSplitBill } from '@utils/calculations/splitBill';
import { formatNumber } from '@utils/formatNumber';

export function SplitBillPage() {
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
      title="Split Bill Calculator"
      fields={
        <>
          <FormField label="Bill amount" value={bill} onChange={setBill} placeholder="0" />
          <FormField label="Number of people" value={people} onChange={setPeople} placeholder="0" />
          <FormField label="Tip" value={tip} onChange={setTip} suffix="%" placeholder="0" />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: 'Each person pays',
              value: formatNumber(amountPerPerson, 2),
              emphasis: true,
            },
            { label: 'Tip amount', value: formatNumber(tipAmount, 2) },
            { label: 'Total with tip', value: formatNumber(totalWithTip, 2) },
          ]}
        />
      }
    />
  );
}
