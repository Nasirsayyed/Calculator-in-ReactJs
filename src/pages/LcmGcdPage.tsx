import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { TextAreaField } from '@components/common/TextAreaField';
import { ResultCard } from '@components/common/ResultCard';
import { parseNumberList } from '@utils/calculations/average';
import { calculateLcmGcd } from '@utils/calculations/lcmGcd';

export function LcmGcdPage() {
  const [input, setInput] = useState('');
  const values = parseNumberList(input);
  const { gcd, lcm } = calculateLcmGcd(values);
  const hasResult = values.length > 0 && gcd !== 0;

  return (
    <FormPage
      title="LCM / GCD Calculator"
      fields={
        <TextAreaField
          label="Numbers (comma or space separated)"
          value={input}
          onChange={setInput}
          placeholder="e.g. 12, 18, 24"
        />
      }
      result={
        <ResultCard
          rows={[
            { label: 'GCD', value: hasResult ? String(gcd) : '—', emphasis: true },
            { label: 'LCM', value: hasResult ? String(lcm) : '—' },
          ]}
        />
      }
    />
  );
}
