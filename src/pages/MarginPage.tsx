import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateMargin } from '@utils/calculations/margin';
import { formatNumber } from '@utils/formatNumber';

export function MarginPage() {
  const [cost, setCost] = useState('');
  const [revenue, setRevenue] = useState('');

  const { profit, grossMarginPercent, markupPercent } = calculateMargin(
    Number(cost) || 0,
    Number(revenue) || 0,
  );

  return (
    <FormPage
      title="Margin Calculator"
      fields={
        <>
          <FormField label="Cost" value={cost} onChange={setCost} placeholder="0" />
          <FormField label="Revenue" value={revenue} onChange={setRevenue} placeholder="0" />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'Profit', value: formatNumber(profit, 2) },
            {
              label: 'Gross margin',
              value: `${formatNumber(grossMarginPercent, 2)}%`,
              emphasis: true,
            },
            { label: 'Markup', value: `${formatNumber(markupPercent, 2)}%` },
          ]}
        />
      }
    />
  );
}
