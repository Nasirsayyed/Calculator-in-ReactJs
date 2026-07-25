import { cx } from '@utils/classNames';
import styles from './ResultCard.module.css';

export interface ResultRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface ResultCardProps {
  rows: ResultRow[];
}

export function ResultCard({ rows }: ResultCardProps) {
  return (
    <div className={styles.card} role="group" aria-live="polite">
      {rows.map((row) => (
        <div key={row.label} className={cx(styles.row, row.emphasis && styles.emphasis)}>
          <span className={styles.label}>{row.label}</span>
          <span className={styles.value}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
