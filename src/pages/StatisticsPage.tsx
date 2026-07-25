import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { TextAreaField } from '@components/common/TextAreaField';
import { ResultCard } from '@components/common/ResultCard';
import { parseNumberList } from '@utils/calculations/average';
import { calculateStatistics } from '@utils/calculations/statistics';
import { formatNumber } from '@utils/formatNumber';

export function StatisticsPage() {
  const [input, setInput] = useState('');
  const values = parseNumberList(input);
  const { mean, range, populationVariance, populationStdDev, sampleVariance, sampleStdDev } =
    calculateStatistics(values);
  const hasResult = values.length > 0;

  return (
    <FormPage
      title="Statistics Calculator"
      fields={
        <TextAreaField
          label="Numbers (comma or space separated)"
          value={input}
          onChange={setInput}
          placeholder="e.g. 2, 4, 4, 4, 5, 5, 7, 9"
        />
      }
      result={
        <ResultCard
          rows={[
            { label: 'Mean', value: hasResult ? formatNumber(mean, 4) : '—', emphasis: true },
            { label: 'Range', value: hasResult ? formatNumber(range, 4) : '—' },
            {
              label: 'Std deviation (population)',
              value: hasResult ? formatNumber(populationStdDev, 4) : '—',
            },
            {
              label: 'Variance (population)',
              value: hasResult ? formatNumber(populationVariance, 4) : '—',
            },
            {
              label: 'Std deviation (sample)',
              value: hasResult ? formatNumber(sampleStdDev, 4) : '—',
            },
            {
              label: 'Variance (sample)',
              value: hasResult ? formatNumber(sampleVariance, 4) : '—',
            },
          ]}
        />
      }
    />
  );
}
