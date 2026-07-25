import { motion } from 'framer-motion';
import { FiClock, FiDatabase, FiGrid, FiMoon, FiSettings, FiSun } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '@context/SettingsContext';
import { IconButton } from '@components/common/IconButton';
import { cx } from '@utils/classNames';
import styles from './Navbar.module.css';

const MODES: { path: string; label: string }[] = [
  { path: '/', label: 'Standard' },
  { path: '/scientific', label: 'Scientific' },
];

export interface NavbarProps {
  onOpenHistory: () => void;
  onOpenMemory: () => void;
  onOpenSettings: () => void;
  onOpenModes: () => void;
}

export function Navbar({ onOpenHistory, onOpenMemory, onOpenSettings, onOpenModes }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, dispatch } = useSettings();
  const isDark = settings.theme === 'dark' || settings.theme === 'amoled';

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', theme: isDark ? 'light' : 'dark' });
  };

  return (
    <header className={styles.navbar}>
      <span className={styles.brand}>Calculator</span>

      <div className={styles.tabs} role="tablist" aria-label="Calculator mode">
        {MODES.map((mode) => {
          const active = location.pathname === mode.path;
          return (
            <button
              key={mode.path}
              type="button"
              role="tab"
              aria-selected={active}
              className={cx(styles.tab, active && styles.tabActive)}
              onClick={() => navigate(mode.path)}
            >
              {active && (
                <motion.span
                  layoutId="tab-indicator"
                  className={styles.tabIndicator}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{mode.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.actions}>
        <IconButton
          ariaLabel={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </IconButton>
        <IconButton ariaLabel="Browse calculators" onClick={onOpenModes}>
          <FiGrid />
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
