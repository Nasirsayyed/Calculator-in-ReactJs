import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { ResultCard } from '@components/common/ResultCard';
import {
  addVectors,
  crossProduct,
  dotProduct,
  magnitude,
  subtractVectors,
  type Vector,
} from '@utils/calculations/vector';
import { formatNumber } from '@utils/formatNumber';
import styles from './VectorPage.module.css';

type Dimension = '2' | '3';
type Operation = 'add' | 'subtract' | 'dot' | 'cross' | 'magnitude';

const DIMENSIONS: { id: Dimension; label: string }[] = [
  { id: '2', label: '2D' },
  { id: '3', label: '3D' },
];

function useVectorInputs(size: number) {
  const [values, setValues] = useState<string[]>(Array(size).fill('0'));
  if (values.length !== size) setValues(Array(size).fill('0'));

  const setComponent = (index: number, value: string) => {
    setValues((prev) => prev.map((component, i) => (i === index ? value : component)));
  };
  const asVector: Vector = values.map((value) => Number(value) || 0);
  return { values, setComponent, asVector };
}

function VectorInput({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div>
      <span className={styles.vectorLabel}>{label}</span>
      <div className={styles.row}>
        {values.map((value, index) => (
          <input
            key={index}
            className={styles.cell}
            type="number"
            inputMode="decimal"
            aria-label={`${label} component ${index + 1}`}
            value={value}
            onChange={(event) => onChange(index, event.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

export function VectorPage() {
  const [dimension, setDimension] = useState<Dimension>('3');
  const size = Number(dimension);
  const [operation, setOperation] = useState<Operation>('add');
  const vectorA = useVectorInputs(size);
  const vectorB = useVectorInputs(size);

  const operations: { id: Operation; label: string }[] = [
    { id: 'add', label: 'A + B' },
    { id: 'subtract', label: 'A - B' },
    { id: 'dot', label: 'A · B' },
    ...(size === 3 ? [{ id: 'cross' as Operation, label: 'A × B' }] : []),
    { id: 'magnitude', label: '|A|' },
  ];

  const activeOperation = operations.some((op) => op.id === operation) ? operation : 'add';
  const needsB = activeOperation !== 'magnitude';

  let vectorResult: Vector | null = null;
  let scalarResult: number | null = null;

  if (activeOperation === 'add') vectorResult = addVectors(vectorA.asVector, vectorB.asVector);
  else if (activeOperation === 'subtract')
    vectorResult = subtractVectors(vectorA.asVector, vectorB.asVector);
  else if (activeOperation === 'dot') scalarResult = dotProduct(vectorA.asVector, vectorB.asVector);
  else if (activeOperation === 'cross')
    vectorResult = crossProduct(vectorA.asVector, vectorB.asVector);
  else scalarResult = magnitude(vectorA.asVector);

  return (
    <FormPage
      title="Vector Calculator"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Dimension"
            options={DIMENSIONS}
            value={dimension}
            onChange={setDimension}
          />
          <SegmentedControl
            ariaLabel="Operation"
            options={operations}
            value={activeOperation}
            onChange={setOperation}
          />
          <VectorInput label="Vector A" values={vectorA.values} onChange={vectorA.setComponent} />
          {needsB && (
            <VectorInput label="Vector B" values={vectorB.values} onChange={vectorB.setComponent} />
          )}
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: 'Result',
              value:
                scalarResult !== null
                  ? formatNumber(scalarResult, 4)
                  : (vectorResult?.map((v) => formatNumber(v, 4)).join(', ') ?? '—'),
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
