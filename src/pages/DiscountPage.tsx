import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateDiscount } from '@utils/calculations/discount';
import { formatNumber } from '@utils/formatNumber';

export function DiscountPage() {
  const { t } = useTranslation();
  const [price, setPrice] = useState('');
  const [percent, setPercent] = useState('');

  const { discountAmount, finalPrice } = calculateDiscount(
    Number(price) || 0,
    Number(percent) || 0,
  );

  return (
    <FormPage
      title={t('pages.discount.title')}
      fields={
        <>
          <FormField
            label={t('pages.discount.originalPrice')}
            value={price}
            onChange={setPrice}
            placeholder="0"
          />
          <FormField
            label={t('pages.discount.discount')}
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
            { label: t('pages.discount.youSave'), value: formatNumber(discountAmount, 2) },
            {
              label: t('pages.discount.finalPrice'),
              value: formatNumber(finalPrice, 2),
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
