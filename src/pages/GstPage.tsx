import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateGst, type GstMode } from '@utils/calculations/gst';
import { formatNumber } from '@utils/formatNumber';

const MODES: { id: GstMode; label: string }[] = [
  { id: 'add', label: 'Add GST' },
  { id: 'remove', label: 'Remove GST' },
];

export function GstPage() {
  const [mode, setMode] = useState<GstMode>('add');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');

  const { baseAmount, gstAmount, totalAmount } = calculateGst(
    Number(amount) || 0,
    Number(rate) || 0,
    mode,
  );

  return (
    <FormPage
      title="GST Calculator"
      fields={
        <>
          <SegmentedControl ariaLabel="GST mode" options={MODES} value={mode} onChange={setMode} />
          <FormField
            label={mode === 'add' ? 'Amount (excl. GST)' : 'Amount (incl. GST)'}
            value={amount}
            onChange={setAmount}
            placeholder="0"
          />
          <FormField label="GST rate" value={rate} onChange={setRate} suffix="%" placeholder="0" />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'Base amount', value: formatNumber(baseAmount, 2) },
            { label: 'GST amount', value: formatNumber(gstAmount, 2) },
            { label: 'Total amount', value: formatNumber(totalAmount, 2), emphasis: true },
          ]}
        />
      }
    />
  );
}
