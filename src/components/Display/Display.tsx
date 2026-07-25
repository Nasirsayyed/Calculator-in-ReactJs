import { AnimatePresence, motion } from 'framer-motion';
import { cx } from '@utils/classNames';
import styles from './Display.module.css';

export interface DisplayProps {
  expression: string;
  preview: string;
  result: string;
  error: string | null;
  justEvaluated: boolean;
  errorNonce: number;
}

const shakeAnimation = {
  x: [0, -10, 10, -8, 8, -4, 4, 0],
  transition: { duration: 0.45 },
};

export function Display({
  expression,
  preview,
  result,
  error,
  justEvaluated,
  errorNonce,
}: DisplayProps) {
  const primary = justEvaluated ? result : expression || '0';
  const secondary = error
    ? error
    : justEvaluated
      ? expression
      : preview && preview !== expression
        ? `= ${preview}`
        : '';

  return (
    <motion.div
      className={styles.display}
      key={errorNonce}
      animate={error ? shakeAnimation : undefined}
      role="group"
      aria-label="Calculator display"
    >
      <div
        className={cx(styles.secondary, styles.scrollbarHidden, error && styles.errorText)}
        aria-live="polite"
        data-testid="calculator-secondary"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- WCAG 2.1.1: scrolls horizontally (overflow-x: auto) with no other keyboard-reachable way to pan it
        tabIndex={0}
      >
        {secondary || ' '}
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={primary}
          className={cx(styles.primary, styles.scrollbarHidden)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          aria-live="assertive"
          data-testid="calculator-primary"
          tabIndex={0}
        >
          {primary}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
