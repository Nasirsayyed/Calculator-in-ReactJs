import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateDiscount } from '@utils/calculations/discount';
import { formatNumber } from '@utils/formatNumber';

export function DiscountPage() {
  const [price, setPrice] = useState('');
  const [percent, setPercent] = useState('');

  const { discountAmount, finalPrice } = calculateDiscount(
    Number(price) || 0,
    Number(percent) || 0,
  );

  return (
    <FormPage
      title="Discount Calculator"
      fields={
        <>
          <FormField label="Original price" value={price} onChange={setPrice} placeholder="0" />
          <FormField
            label="Discount"
            value={percent}
            onChange={setPercent}
            suffix="%"
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'You save', value: formatNumber(discountAmount, 2) },
            { label: 'Final price', value: formatNumber(finalPrice, 2), emphasis: true },
          ]}
        />
      }
    />
  );
}
