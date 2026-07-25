import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateTip } from '@utils/calculations/tip';
import { formatNumber } from '@utils/formatNumber';

export function TipPage() {
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
      title="Tip Calculator"
      fields={
        <>
          <FormField label="Bill amount" value={bill} onChange={setBill} placeholder="0" />
          <FormField
            label="Tip"
            value={tipPercent}
            onChange={setTipPercent}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label="Split between"
            value={people}
            onChange={setPeople}
            suffix="people"
            min={1}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'Tip amount', value: formatNumber(tipAmount, 2) },
            { label: 'Total bill', value: formatNumber(totalAmount, 2) },
            { label: 'Per person', value: formatNumber(perPerson, 2), emphasis: true },
          ]}
        />
      }
    />
  );
}
