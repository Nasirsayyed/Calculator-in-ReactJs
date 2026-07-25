import { useCalculator } from '@context/CalculatorContext';
import { useMemoryBank } from '@context/MemoryContext';
import { getCurrentNumericValue } from '@utils/currentValue';
import styles from './Memory.module.css';

export function MemoryToolbar() {
  const { state, input } = useCalculator();
  const { entries, save, add, subtract, clear } = useMemoryBank();
  const currentValue = getCurrentNumericValue(state);
  const hasMemory = entries.length > 0;

  const recall = () => {
    const top = entries[0];
    if (top) input(String(top.value));
  };

  return (
    <div className={styles.toolbar} role="group" aria-label="Memory functions">
      <button type="button" className={styles.toolbarButton} disabled={!hasMemory} onClick={clear}>
        MC
      </button>
      <button type="button" className={styles.toolbarButton} disabled={!hasMemory} onClick={recall}>
        MR
      </button>
      <button
        type="button"
        className={styles.toolbarButton}
        disabled={currentValue === null}
        onClick={() => currentValue !== null && save(currentValue)}
      >
        MS
      </button>
      <button
        type="button"
        className={styles.toolbarButton}
        disabled={currentValue === null}
        onClick={() => currentValue !== null && add(currentValue)}
      >
        M+
      </button>
      <button
        type="button"
        className={styles.toolbarButton}
        disabled={currentValue === null}
        onClick={() => currentValue !== null && subtract(currentValue)}
      >
        M−
      </button>
    </div>
  );
}
