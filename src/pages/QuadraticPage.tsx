import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { solveQuadratic } from '@utils/calculations/quadratic';
import { formatNumber } from '@utils/formatNumber';

export function QuadraticPage() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');

  const result = solveQuadratic(Number(a) || 0, Number(b) || 0, Number(c) || 0);

  const rootsLabel = result.isComplex
    ? `${formatNumber(result.realPart, 4)} ± ${formatNumber(result.imaginaryPart, 4)}i`
    : result.roots.length > 0
      ? result.roots.map((root) => formatNumber(root, 4)).join(', ')
      : '—';

  return (
    <FormPage
      title="Quadratic Solver"
      fields={
        <>
          <FormField label="a" value={a} onChange={setA} placeholder="1" />
          <FormField label="b" value={b} onChange={setB} placeholder="0" />
          <FormField label="c" value={c} onChange={setC} placeholder="0" />
        </>
      }
      result={
        <ResultCard
          rows={[
            { label: 'Roots', value: rootsLabel, emphasis: true },
            { label: 'Discriminant', value: formatNumber(result.discriminant, 4) },
          ]}
        />
      }
    />
  );
}
