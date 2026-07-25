import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { Button } from '@components/Button';
import { generateRandomIntegers } from '@utils/calculations/randomNumber';

export function RandomNumberPage() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const handleGenerate = () => {
    setResults(generateRandomIntegers(Number(min) || 0, Number(max) || 0, Number(count) || 0));
  };

  return (
    <FormPage
      title="Random Number Generator"
      fields={
        <>
          <FormField label="Minimum" value={min} onChange={setMin} placeholder="1" />
          <FormField label="Maximum" value={max} onChange={setMax} placeholder="100" />
          <FormField label="How many" value={count} onChange={setCount} placeholder="1" />
          <Button onClick={handleGenerate} variant="equals" wide>
            Generate
          </Button>
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: 'Result',
              value: results.length ? results.join(', ') : '—',
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
