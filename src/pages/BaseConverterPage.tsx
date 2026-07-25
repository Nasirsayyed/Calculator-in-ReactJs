import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { SelectField } from '@components/common/SelectField';
import { ResultCard } from '@components/common/ResultCard';
import { convertBase } from '@utils/calculations/baseConverter';

export function BaseConverterPage() {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [fromBase, setFromBase] = useState('10');
  const [toBase, setToBase] = useState('2');

  const BASE_OPTIONS = [
    { value: '2', label: t('pages.baseConverter.binaryBase2') },
    { value: '8', label: t('pages.baseConverter.octalBase8') },
    { value: '10', label: t('pages.baseConverter.decimalBase10') },
    { value: '16', label: t('pages.baseConverter.hexadecimalBase16') },
  ];

  const result = convertBase(value, Number(fromBase), Number(toBase));

  return (
    <FormPage
      title={t('pages.baseConverter.title')}
      fields={
        <>
          <SelectField
            label={t('pages.baseConverter.from')}
            value={fromBase}
            onChange={setFromBase}
            options={BASE_OPTIONS}
          />
          <FormField
            label={t('pages.baseConverter.value')}
            type="text"
            value={value}
            onChange={setValue}
            placeholder="0"
          />
          <SelectField
            label={t('pages.baseConverter.to')}
            value={toBase}
            onChange={setToBase}
            options={BASE_OPTIONS}
          />
        </>
      }
      result={
        <ResultCard
          rows={[{ label: t('pages.baseConverter.result'), value: result || '—', emphasis: true }]}
        />
      }
    />
  );
}
