import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { TextAreaField } from '@components/common/TextAreaField';
import { ResultCard } from '@components/common/ResultCard';
import { parseNumberList } from '@utils/calculations/average';
import { calculateLcmGcd } from '@utils/calculations/lcmGcd';

export function LcmGcdPage() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const values = parseNumberList(input);
  const { gcd, lcm } = calculateLcmGcd(values);
  const hasResult = values.length > 0 && gcd !== 0;

  return (
    <FormPage
      title={t('pages.lcmGcd.title')}
      fields={
        <TextAreaField
          label={t('pages.lcmGcd.numbers')}
          value={input}
          onChange={setInput}
          placeholder={t('pages.lcmGcd.placeholderExample')}
        />
      }
      result={
        <ResultCard
          rows={[
            { label: t('pages.lcmGcd.gcd'), value: hasResult ? String(gcd) : '—', emphasis: true },
            { label: t('pages.lcmGcd.lcm'), value: hasResult ? String(lcm) : '—' },
          ]}
        />
      }
    />
  );
}
