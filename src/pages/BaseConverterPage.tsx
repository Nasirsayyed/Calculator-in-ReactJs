import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { SelectField } from '@components/common/SelectField';
import { ResultCard } from '@components/common/ResultCard';
import { convertBase } from '@utils/calculations/baseConverter';

const BASE_OPTIONS = [
  { value: '2', label: 'Binary (base 2)' },
  { value: '8', label: 'Octal (base 8)' },
  { value: '10', label: 'Decimal (base 10)' },
  { value: '16', label: 'Hexadecimal (base 16)' },
];

export function BaseConverterPage() {
  const [value, setValue] = useState('');
  const [fromBase, setFromBase] = useState('10');
  const [toBase, setToBase] = useState('2');

  const result = convertBase(value, Number(fromBase), Number(toBase));

  return (
    <FormPage
      title="Base Converter"
      fields={
        <>
          <SelectField
            label="From"
            value={fromBase}
            onChange={setFromBase}
            options={BASE_OPTIONS}
          />
          <FormField label="Value" type="text" value={value} onChange={setValue} placeholder="0" />
          <SelectField label="To" value={toBase} onChange={setToBase} options={BASE_OPTIONS} />
        </>
      }
      result={<ResultCard rows={[{ label: 'Result', value: result || '—', emphasis: true }]} />}
    />
  );
}
