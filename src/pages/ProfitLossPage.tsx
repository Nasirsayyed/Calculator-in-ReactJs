import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateProfitLoss } from '@utils/calculations/profitLoss';
import { formatNumber } from '@utils/formatNumber';

export function ProfitLossPage() {
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const { amount, percent, isProfit } = calculateProfitLoss(
    Number(costPrice) || 0,
    Number(sellingPrice) || 0,
  );

  return (
    <FormPage
      title="Profit & Loss Calculator"
      fields={
        <>
          <FormField label="Cost price" value={costPrice} onChange={setCostPrice} placeholder="0" />
          <FormField
            label="Selling price"
            value={sellingPrice}
            onChange={setSellingPrice}
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: isProfit ? 'Profit' : 'Loss', value: formatNumber(amount, 2), emphasis: true },
            { label: 'Percentage', value: `${formatNumber(percent, 2)}%` },
          ]}
        />
      }
    />
  );
}
