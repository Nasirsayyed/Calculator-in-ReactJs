import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { TextAreaField } from '@components/common/TextAreaField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateAverage, parseNumberList } from '@utils/calculations/average';
import { formatNumber } from '@utils/formatNumber';

export function AveragePage() {
  const [input, setInput] = useState('');
  const values = parseNumberList(input);
  const { mean, median, mode, min, max, sum, count } = calculateAverage(values);

  return (
    <FormPage
      title="Average Calculator"
      fields={
        <TextAreaField
          label="Numbers (comma or space separated)"
          value={input}
          onChange={setInput}
          placeholder="e.g. 4, 8, 15, 16, 23, 42"
        />
      }
      result={
        <ResultCard
          rows={[
            { label: 'Mean', value: count ? formatNumber(mean, 4) : '—', emphasis: true },
            { label: 'Median', value: count ? formatNumber(median, 4) : '—' },
            {
              label: 'Mode',
              value: mode.length ? mode.map((v) => formatNumber(v, 4)).join(', ') : '—',
            },
            { label: 'Min', value: count ? formatNumber(min, 4) : '—' },
            { label: 'Max', value: count ? formatNumber(max, 4) : '—' },
            { label: 'Sum', value: count ? formatNumber(sum, 4) : '—' },
            { label: 'Count', value: String(count) },
          ]}
        />
      }
    />
  );
}
