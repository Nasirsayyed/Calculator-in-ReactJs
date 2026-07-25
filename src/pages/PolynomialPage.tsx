import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

export function PolynomialPage() {
  const { t } = useTranslation();
  const [operation, setOperation] = useState<Operation>('evaluate');
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [x, setX] = useState('');

  const OPERATIONS: { id: Operation; label: string }[] = [
    { id: 'evaluate', label: t('pages.polynomial.evaluateOp') },
    { id: 'add', label: t('pages.polynomial.addOp') },
    { id: 'multiply', label: t('pages.polynomial.multiplyOp') },
  ];

  const coeffsP = parseNumberList(p);
  const coeffsQ = parseNumberList(q);

  const rows =
    operation === 'evaluate'
      ? [
          {
            label: t('pages.polynomial.evaluateLabel', { x: x || 0 }),
            value: coeffsP.length
              ? formatNumber(evaluatePolynomial(coeffsP, Number(x) || 0), 4)
              : '—',
            emphasis: true,
          },
        ]
      : [
          {
            label: t('pages.polynomial.result'),
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
      title={t('pages.polynomial.title')}
      fields={
        <>
          <SegmentedControl
            ariaLabel={t('pages.polynomial.operation')}
            options={OPERATIONS}
            value={operation}
            onChange={setOperation}
          />
          <TextAreaField
            label={t('pages.polynomial.pCoefficients')}
            value={p}
            onChange={setP}
            placeholder={t('pages.polynomial.pCoefficientsPlaceholder')}
          />
          {operation !== 'evaluate' && (
            <TextAreaField
              label={t('pages.polynomial.qCoefficients')}
              value={q}
              onChange={setQ}
              placeholder={t('pages.polynomial.qCoefficientsPlaceholder')}
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
