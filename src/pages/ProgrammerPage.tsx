import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { SelectField } from '@components/common/SelectField';
import { SegmentedControl } from '@components/common/SegmentedControl';
import { isValidForBase } from '@utils/calculations/baseConverter';
import {
  bitwiseOperate,
  toAllBases,
  type AllBases,
  type BitwiseOp,
} from '@utils/calculations/programmerCalculator';
import styles from './ProgrammerPage.module.css';

const BASE_OPTIONS = [
  { value: '2', label: 'Binary' },
  { value: '8', label: 'Octal' },
  { value: '10', label: 'Decimal' },
  { value: '16', label: 'Hexadecimal' },
];

const OPERATIONS: { id: BitwiseOp; label: string }[] = [
  { id: 'AND', label: 'AND' },
  { id: 'OR', label: 'OR' },
  { id: 'XOR', label: 'XOR' },
  { id: 'NOT', label: 'NOT' },
  { id: 'LSHIFT', label: '<<' },
  { id: 'RSHIFT', label: '>>' },
];

function BasesDisplay({ title, bases }: { title: string; bases: AllBases }) {
  return (
    <div>
      <span className={styles.baseLabel}>{title}</span>
      <div className={styles.basesGrid}>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>Binary</span>
          <span className={styles.baseValue}>{bases.bin}</span>
        </div>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>Octal</span>
          <span className={styles.baseValue}>{bases.oct}</span>
        </div>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>Decimal</span>
          <span className={styles.baseValue}>{bases.dec}</span>
        </div>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>Hex</span>
          <span className={styles.baseValue}>{bases.hex}</span>
        </div>
      </div>
    </div>
  );
}

export function ProgrammerPage() {
  const [inputBase, setInputBase] = useState('10');
  const [rawA, setRawA] = useState('0');
  const [rawB, setRawB] = useState('0');
  const [operation, setOperation] = useState<BitwiseOp>('AND');

  const base = Number(inputBase);
  const valueA = isValidForBase(rawA, base) ? parseInt(rawA, base) || 0 : 0;
  const valueB = isValidForBase(rawB, base) ? parseInt(rawB, base) || 0 : 0;

  const basesA = toAllBases(valueA);
  const resultValue = bitwiseOperate(valueA, valueB, operation);
  const basesResult = toAllBases(resultValue);

  return (
    <FormPage
      title="Programmer Calculator"
      fields={
        <>
          <SelectField
            label="Input base"
            value={inputBase}
            onChange={setInputBase}
            options={BASE_OPTIONS}
          />
          <FormField label="Value A" type="text" value={rawA} onChange={setRawA} placeholder="0" />
          <SegmentedControl
            ariaLabel="Bitwise operation"
            options={OPERATIONS}
            value={operation}
            onChange={setOperation}
          />
          {operation !== 'NOT' && (
            <FormField
              label="Value B"
              type="text"
              value={rawB}
              onChange={setRawB}
              placeholder="0"
            />
          )}
        </>
      }
      result={
        <>
          <BasesDisplay title="A in all bases" bases={basesA} />
          <BasesDisplay title={`Result (32-bit unsigned)`} bases={basesResult} />
        </>
      }
    />
  );
}
