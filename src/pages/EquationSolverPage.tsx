import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { solveLinearSystem } from '@utils/calculations/linearSystem';
import { formatNumber } from '@utils/formatNumber';
import styles from './EquationSolverPage.module.css';

export function EquationSolverPage() {
  const { t } = useTranslation();
  const [a1, setA1] = useState('');
  const [b1, setB1] = useState('');
  const [c1, setC1] = useState('');
  const [a2, setA2] = useState('');
  const [b2, setB2] = useState('');
  const [c2, setC2] = useState('');

  const solution = solveLinearSystem(
    Number(a1) || 0,
    Number(b1) || 0,
    Number(c1) || 0,
    Number(a2) || 0,
    Number(b2) || 0,
    Number(c2) || 0,
  );

  const rows =
    solution.type === 'unique'
      ? [
          { label: 'x', value: formatNumber(solution.x, 4), emphasis: true },
          { label: 'y', value: formatNumber(solution.y, 4), emphasis: true },
        ]
      : [
          {
            label: t('pages.equationSolver.solution'),
            value:
              solution.type === 'none'
                ? t('pages.equationSolver.noSolution')
                : t('pages.equationSolver.infiniteSolutions'),
            emphasis: true,
          },
        ];

  return (
    <FormPage
      title={t('pages.equationSolver.title')}
      fields={
        <>
          <p className={styles.sectionLabel}>a₁x + b₁y = c₁</p>
          <FormField label="a₁" value={a1} onChange={setA1} placeholder="0" />
          <FormField label="b₁" value={b1} onChange={setB1} placeholder="0" />
          <FormField label="c₁" value={c1} onChange={setC1} placeholder="0" />
          <p className={styles.sectionLabel}>a₂x + b₂y = c₂</p>
          <FormField label="a₂" value={a2} onChange={setA2} placeholder="0" />
          <FormField label="b₂" value={b2} onChange={setB2} placeholder="0" />
          <FormField label="c₂" value={c2} onChange={setC2} placeholder="0" />
        </>
      }
      result={<ResultCard rows={rows} />}
    />
  );
}
