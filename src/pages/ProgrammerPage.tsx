import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const OPERATIONS: { id: BitwiseOp; label: string }[] = [
  { id: 'AND', label: 'AND' },
  { id: 'OR', label: 'OR' },
  { id: 'XOR', label: 'XOR' },
  { id: 'NOT', label: 'NOT' },
  { id: 'LSHIFT', label: '<<' },
  { id: 'RSHIFT', label: '>>' },
];

function BasesDisplay({ title, bases }: { title: string; bases: AllBases }) {
  const { t } = useTranslation();
  return (
    <div>
      <span className={styles.baseLabel}>{title}</span>
      <div className={styles.basesGrid}>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>{t('pages.programmer.binary')}</span>
          <span className={styles.baseValue}>{bases.bin}</span>
        </div>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>{t('pages.programmer.octal')}</span>
          <span className={styles.baseValue}>{bases.oct}</span>
        </div>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>{t('pages.programmer.decimal')}</span>
          <span className={styles.baseValue}>{bases.dec}</span>
        </div>
        <div className={styles.baseCell}>
          <span className={styles.baseLabel}>{t('pages.programmer.hex')}</span>
          <span className={styles.baseValue}>{bases.hex}</span>
        </div>
      </div>
    </div>
  );
}

export function ProgrammerPage() {
  const { t } = useTranslation();
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

  const BASE_OPTIONS = [
    { value: '2', label: t('pages.programmer.binary') },
    { value: '8', label: t('pages.programmer.octal') },
    { value: '10', label: t('pages.programmer.decimal') },
    { value: '16', label: t('pages.programmer.hexadecimal') },
  ];

  return (
    <FormPage
      title={t('pages.programmer.title')}
      fields={
        <>
          <SelectField
            label={t('pages.programmer.inputBase')}
            value={inputBase}
            onChange={setInputBase}
            options={BASE_OPTIONS}
          />
          <FormField
            label={t('pages.programmer.valueA')}
            type="text"
            value={rawA}
            onChange={setRawA}
            placeholder="0"
          />
          <SegmentedControl
            ariaLabel={t('pages.programmer.bitwiseOperation')}
            options={OPERATIONS}
            value={operation}
            onChange={setOperation}
          />
          {operation !== 'NOT' && (
            <FormField
              label={t('pages.programmer.valueB')}
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
          <BasesDisplay title={t('pages.programmer.aInAllBases')} bases={basesA} />
          <BasesDisplay title={t('pages.programmer.resultInAllBases')} bases={basesResult} />
        </>
      }
    />
  );
}
