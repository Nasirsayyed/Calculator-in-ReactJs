import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { calculateGst, type GstMode } from '@utils/calculations/gst';
import { formatNumber } from '@utils/formatNumber';

export function GstPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<GstMode>('add');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');

  const MODES: { id: GstMode; label: string }[] = [
    { id: 'add', label: t('pages.gst.addGst') },
    { id: 'remove', label: t('pages.gst.removeGst') },
  ];

  const { baseAmount, gstAmount, totalAmount } = calculateGst(
    Number(amount) || 0,
    Number(rate) || 0,
    mode,
  );

  return (
    <FormPage
      title={t('pages.gst.title')}
      fields={
        <>
          <SegmentedControl
            ariaLabel={t('pages.gst.gstMode')}
            options={MODES}
            value={mode}
            onChange={setMode}
          />
          <FormField
            label={mode === 'add' ? t('pages.gst.amountExclGst') : t('pages.gst.amountInclGst')}
            value={amount}
            onChange={setAmount}
            placeholder="0"
          />
          <FormField
            label={t('pages.gst.gstRate')}
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.gst.baseAmount'), value: formatNumber(baseAmount, 2) },
            { label: t('pages.gst.gstAmount'), value: formatNumber(gstAmount, 2) },
            {
              label: t('pages.gst.totalAmount'),
              value: formatNumber(totalAmount, 2),
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
