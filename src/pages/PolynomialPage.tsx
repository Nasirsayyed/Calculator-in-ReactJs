import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { TextAreaField } from '@components/common/TextAreaField';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { SegmentedControl } from '@components/common/SegmentedControl';
import {
  addPolynomials,
  evaluatePolynomial,
  formatPolynomial,
  multiplyPolynomials,
} from '@utils/calculations/polynomial';
import { parseNumberList } from '@utils/calculations/average';
import { formatNumber } from '@utils/formatNumber';

type Operation = 'evaluate' | 'add' | 'multiply';

const OPERATIONS: { id: Operation; label: string }[] = [
  { id: 'evaluate', label: 'Evaluate P(x)' },
  { id: 'add', label: 'P + Q' },
  { id: 'multiply', label: 'P × Q' },
];

export function PolynomialPage() {
  const [operation, setOperation] = useState<Operation>('evaluate');
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [x, setX] = useState('');

  const coeffsP = parseNumberList(p);
  const coeffsQ = parseNumberList(q);

  const rows =
    operation === 'evaluate'
      ? [
          {
            label: `P(${x || 0})`,
            value: coeffsP.length
              ? formatNumber(evaluatePolynomial(coeffsP, Number(x) || 0), 4)
              : '—',
            emphasis: true,
          },
        ]
      : [
          {
            label: 'Result',
            value:
              coeffsP.length || coeffsQ.length
                ? formatPolynomial(
                    operation === 'add'
                      ? addPolynomials(coeffsP, coeffsQ)
                      : multiplyPolynomials(coeffsP, coeffsQ),
                  )
                : '—',
            emphasis: true,
          },
        ];

  return (
    <FormPage
      title="Polynomial Calculator"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Operation"
            options={OPERATIONS}
            value={operation}
            onChange={setOperation}
          />
          <TextAreaField
            label="P coefficients (constant term first)"
            value={p}
            onChange={setP}
            placeholder="e.g. 1, 3, 2 for 2x^2 + 3x + 1"
          />
          {operation !== 'evaluate' && (
            <TextAreaField
              label="Q coefficients (constant term first)"
              value={q}
              onChange={setQ}
              placeholder="e.g. -1, 1 for x - 1"
            />
          )}
          {operation === 'evaluate' && (
            <FormField label="x" value={x} onChange={setX} placeholder="0" />
          )}
        </>
      }
      result={<ResultCard rows={rows} />}
    />
  );
}
