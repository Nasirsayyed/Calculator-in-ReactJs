import { motion } from 'framer-motion';
import { FiClock, FiDatabase, FiMoon, FiSettings, FiSun } from 'react-icons/fi';
import { useCalculator } from '@context/CalculatorContext';
import { useSettings } from '@context/SettingsContext';
import { IconButton } from '@components/common/IconButton';
import { cx } from '@utils/classNames';
import type { CalculatorMode } from '@app-types/calculator';
import styles from './Navbar.module.css';

const MODES: { id: CalculatorMode; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'scientific', label: 'Scientific' },
];

export interface NavbarProps {
  onOpenHistory: () => void;
  onOpenMemory: () => void;
  onOpenSettings: () => void;
}

export function Navbar({ onOpenHistory, onOpenMemory, onOpenSettings }: NavbarProps) {
  const { state, setMode } = useCalculator();
  const { settings, dispatch } = useSettings();
  const isDark = settings.theme === 'dark' || settings.theme === 'amoled';

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', theme: isDark ? 'light' : 'dark' });
  };

  return (
    <header className={styles.navbar}>
      <span className={styles.brand}>Calculator</span>

      <div className={styles.tabs} role="tablist" aria-label="Calculator mode">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={state.mode === mode.id}
            className={cx(styles.tab, state.mode === mode.id && styles.tabActive)}
            onClick={() => setMode(mode.id)}
          >
            {state.mode === mode.id && (
              <motion.span
                layoutId="tab-indicator"
                className={styles.tabIndicator}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{mode.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <IconButton
          ariaLabel={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </IconButton>
        <IconButton ariaLabel="Open memory" onClick={onOpenMemory}>
          <FiDatabase />
        </IconButton>
        <IconButton ariaLabel="Open history" onClick={onOpenHistory}>
          <FiClock />
        </IconButton>
        <IconButton ariaLabel="Open settings" onClick={onOpenSettings}>
          <FiSettings />
        </IconButton>
      </div>
    </header>
  );
}
