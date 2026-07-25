import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CALCULATOR_MODES } from '@constants/calculatorModes';
import type { CalculatorModeCategory } from '@constants/calculatorModes';
import { cx } from '@utils/classNames';
import styles from './Modes.module.css';

const CATEGORY_ORDER: CalculatorModeCategory[] = [
  'Core',
  'Finance',
  'Health & Date',
  'Utility',
  'Math',
];

export interface ModesLauncherProps {
  onNavigate: () => void;
}

export function ModesLauncher({ onNavigate }: ModesLauncherProps) {
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? CALCULATOR_MODES.filter((mode) => mode.label.toLowerCase().includes(q))
      : CALCULATOR_MODES;

    return CATEGORY_ORDER.map((category) => ({
      category,
      modes: filtered.filter((mode) => mode.category === category),
    })).filter((group) => group.modes.length > 0);
  }, [query]);

  return (
    <div className={styles.launcher}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search calculators"
        aria-label="Search calculators"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {grouped.length === 0 ? (
        <p className={styles.empty}>No calculators match &quot;{query}&quot;.</p>
      ) : (
        grouped.map((group) => (
          <div key={group.category} className={styles.category}>
            <span className={styles.categoryTitle}>{group.category}</span>
            <div className={styles.grid}>
              {group.modes.map((mode) =>
                mode.status === 'available' ? (
                  <Link key={mode.id} to={mode.path} className={styles.card} onClick={onNavigate}>
                    {mode.label}
                  </Link>
                ) : (
                  <span
                    key={mode.id}
                    className={cx(styles.card, styles.cardDisabled)}
                    aria-disabled="true"
                    title="Coming soon"
                  >
                    {mode.label}
                  </span>
                ),
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
