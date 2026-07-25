import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { Button } from '@components/Button';
import { generateRandomIntegers } from '@utils/calculations/randomNumber';

export function RandomNumberPage() {
  const { t } = useTranslation();
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const handleGenerate = () => {
    setResults(generateRandomIntegers(Number(min) || 0, Number(max) || 0, Number(count) || 0));
  };

  return (
    <FormPage
      title={t('pages.randomNumber.title')}
      fields={
        <>
          <FormField
            label={t('pages.randomNumber.minimum')}
            value={min}
            onChange={setMin}
            placeholder="1"
          />
          <FormField
            label={t('pages.randomNumber.maximum')}
            value={max}
            onChange={setMax}
            placeholder="100"
          />
          <FormField
            label={t('pages.randomNumber.howMany')}
            value={count}
            onChange={setCount}
            placeholder="1"
          />
          <Button onClick={handleGenerate} variant="equals" wide>
            {t('pages.randomNumber.generate')}
          </Button>
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.randomNumber.result'),
              value: results.length ? results.join(', ') : '—',
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
