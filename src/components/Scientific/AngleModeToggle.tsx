import { useSettings } from '@context/SettingsContext';
import { cx } from '@utils/classNames';
import type { AngleMode } from '@app-types/calculator';
import styles from './AngleModeToggle.module.css';

const OPTIONS: { id: AngleMode; label: string }[] = [
  { id: 'deg', label: 'DEG' },
  { id: 'rad', label: 'RAD' },
];

export function AngleModeToggle() {
  const { settings, dispatch } = useSettings();

  return (
    <div className={styles.toggle} role="radiogroup" aria-label="Angle unit">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={settings.angleMode === option.id}
          className={cx(styles.option, settings.angleMode === option.id && styles.optionActive)}
          onClick={() => dispatch({ type: 'SET_ANGLE_MODE', angleMode: option.id })}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
