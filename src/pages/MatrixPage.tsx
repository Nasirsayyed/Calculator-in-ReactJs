import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { ResultCard } from '@components/common/ResultCard';
import {
  addMatrices,
  determinant,
  multiplyMatrices,
  subtractMatrices,
  transpose,
  type Matrix,
} from '@utils/calculations/matrix';
import { formatNumber } from '@utils/formatNumber';
import styles from './MatrixPage.module.css';

type Operation = 'add' | 'subtract' | 'multiply' | 'transpose' | 'determinant';

const OPERATIONS: { id: Operation; label: string }[] = [
  { id: 'add', label: 'A + B' },
  { id: 'subtract', label: 'A - B' },
  { id: 'multiply', label: 'A × B' },
  { id: 'transpose', label: 'Aᵀ' },
  { id: 'determinant', label: '|A|' },
];

function useMatrixInputs() {
  const [values, setValues] = useState(['0', '0', '0', '0']);
  const setCell = (index: number, value: string) => {
    setValues((prev) => prev.map((cell, i) => (i === index ? value : cell)));
  };
  const asMatrix: Matrix = [
    [Number(values[0]) || 0, Number(values[1]) || 0],
    [Number(values[2]) || 0, Number(values[3]) || 0],
  ];
  return { values, setCell, asMatrix };
}

function MatrixGrid({
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
      <span className={styles.matrixLabel}>{label}</span>
      <div className={styles.grid}>
        {values.map((value, index) => (
          <input
            key={index}
            className={styles.cell}
            type="number"
            inputMode="decimal"
            aria-label={`${label} cell ${index + 1}`}
            value={value}
            onChange={(event) => onChange(index, event.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

export function MatrixPage() {
  const [operation, setOperation] = useState<Operation>('add');
  const matrixA = useMatrixInputs();
  const matrixB = useMatrixInputs();

  const needsB = operation === 'add' || operation === 'subtract' || operation === 'multiply';

  let resultMatrix: Matrix | null = null;
  let scalarResult: number | null = null;

  if (operation === 'add') resultMatrix = addMatrices(matrixA.asMatrix, matrixB.asMatrix);
  else if (operation === 'subtract')
    resultMatrix = subtractMatrices(matrixA.asMatrix, matrixB.asMatrix);
  else if (operation === 'multiply')
    resultMatrix = multiplyMatrices(matrixA.asMatrix, matrixB.asMatrix);
  else if (operation === 'transpose') resultMatrix = transpose(matrixA.asMatrix);
  else scalarResult = determinant(matrixA.asMatrix);

  return (
    <FormPage
      title="Matrix Calculator (2×2)"
      fields={
        <>
          <SegmentedControl
            ariaLabel="Operation"
            options={OPERATIONS}
            value={operation}
            onChange={setOperation}
          />
          <MatrixGrid label="Matrix A" values={matrixA.values} onChange={matrixA.setCell} />
          {needsB && (
            <MatrixGrid label="Matrix B" values={matrixB.values} onChange={matrixB.setCell} />
          )}
        </>
      }
      result={
        scalarResult !== null ? (
          <ResultCard
            rows={[{ label: 'Determinant', value: formatNumber(scalarResult, 6), emphasis: true }]}
          />
        ) : (
          <div className={styles.resultGrid}>
            {resultMatrix?.flat().map((value, index) => (
              <div key={index} className={styles.resultCell}>
                {formatNumber(value, 4)}
              </div>
            ))}
          </div>
        )
      }
    />
  );
}
