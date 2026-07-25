import { Button } from '@components/Button';
import { useCalculator } from '@context/CalculatorContext';
import { useSettings } from '@context/SettingsContext';
import { useCalculatorKeyboardShortcuts } from '../../hooks/useCalculatorKeyboardShortcuts';
import { playClickSound, triggerHapticFeedback } from '@utils/feedback';
import type { KeyDescriptor } from '@app-types/keyboard';
import styles from './Keyboard.module.css';

export interface KeyboardProps {
  layout: KeyDescriptor[][];
}

export function Keyboard({ layout }: KeyboardProps) {
  const { input, clear, deleteLast, equals, toggleSign } = useCalculator();
  const { settings } = useSettings();
  useCalculatorKeyboardShortcuts();

  const runAction = (key: KeyDescriptor) => {
    if (settings.soundEnabled) playClickSound();
    if (settings.hapticsEnabled) triggerHapticFeedback();

    switch (key.action) {
      case 'input':
        input(key.value);
        break;
      case 'clear':
        clear();
        break;
      case 'delete':
        deleteLast();
        break;
      case 'equals':
        equals();
        break;
      case 'toggleSign':
        toggleSign();
        break;
    }
  };

  return (
    <div className={styles.keyboard} role="group" aria-label="Calculator keypad">
      {layout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles.row}
          style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
        >
          {row.map((key) => (
            <Button
              key={key.ariaLabel ?? String(key.value || key.label)}
              variant={key.variant}
              wide={key.wide}
              ariaLabel={key.ariaLabel}
              onClick={() => runAction(key)}
            >
              {key.label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
