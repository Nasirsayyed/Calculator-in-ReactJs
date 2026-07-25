import { useState, type ReactNode } from 'react';
import { FiRotateCcw } from 'react-icons/fi';
import { useSettings } from '@context/SettingsContext';
import { Modal } from '@components/common/Modal';
import { cx } from '@utils/classNames';
import { ACCENT_PRESETS, THEMES } from '@constants/themes';
import { CALCULATOR_MODES } from '@constants/calculatorModes';
import type { LayoutDensity, ThemeName } from '@app-types/settings';
import styles from './Settings.module.css';

const AVAILABLE_MODES = CALCULATOR_MODES.filter((mode) => mode.status === 'available');

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.section}>
      <span className={styles.sectionTitle}>{title}</span>
      {children}
    </div>
  );
}

const DENSITY_OPTIONS: { id: LayoutDensity; label: string }[] = [
  { id: 'comfortable', label: 'Comfortable' },
  { id: 'compact', label: 'Compact' },
];

export function SettingsPanel() {
  const { settings, dispatch } = useSettings();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className={styles.panel}>
      <Section title="Theme">
        <div className={styles.segmented} role="radiogroup" aria-label="Theme">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              role="radio"
              aria-checked={settings.theme === theme.id}
              className={cx(
                styles.segmentButton,
                settings.theme === theme.id && styles.segmentActive,
              )}
              onClick={() => dispatch({ type: 'SET_THEME', theme: theme.id as ThemeName })}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Accent color">
        {settings.theme === 'high-contrast' ? (
          <p
            className={styles.sectionTitle}
            style={{ textTransform: 'none', letterSpacing: 'normal' }}
          >
            High Contrast uses a fixed, AA-safe accent - switch themes to customize this.
          </p>
        ) : (
          <div className={styles.swatches} role="radiogroup" aria-label="Accent color">
            {ACCENT_PRESETS.map(({ color }) => (
              <button
                key={color}
                type="button"
                role="radio"
                aria-checked={settings.accentColor === color}
                aria-label={`Accent color ${color}`}
                className={cx(styles.swatch, settings.accentColor === color && styles.swatchActive)}
                style={{ background: color }}
                onClick={() => dispatch({ type: 'SET_ACCENT_COLOR', color })}
              />
            ))}
          </div>
        )}
      </Section>

      <Section title="Font size">
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0.85}
            max={1.3}
            step={0.05}
            value={settings.fontSize}
            aria-label="Font size"
            onChange={(event) =>
              dispatch({ type: 'SET_FONT_SIZE', size: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{Math.round(settings.fontSize * 100)}%</span>
        </div>
      </Section>

      <Section title="Button size">
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0.85}
            max={1.3}
            step={0.05}
            value={settings.buttonSize}
            aria-label="Button size"
            onChange={(event) =>
              dispatch({ type: 'SET_BUTTON_SIZE', size: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{Math.round(settings.buttonSize * 100)}%</span>
        </div>
      </Section>

      <Section title="Animation speed">
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={2}
            step={0.1}
            value={settings.animationSpeed}
            aria-label="Animation speed"
            onChange={(event) =>
              dispatch({ type: 'SET_ANIMATION_SPEED', speed: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{settings.animationSpeed.toFixed(1)}x</span>
        </div>
      </Section>

      <Section title="Decimal precision">
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={15}
            step={1}
            value={settings.decimalPrecision}
            aria-label="Decimal precision"
            onChange={(event) =>
              dispatch({ type: 'SET_DECIMAL_PRECISION', precision: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{settings.decimalPrecision}</span>
        </div>
      </Section>

      <Section title="History limit">
        <input
          type="number"
          className={styles.numberInput}
          min={10}
          max={2000}
          step={10}
          value={settings.historyLimit}
          aria-label="History limit"
          onChange={(event) =>
            dispatch({
              type: 'SET_HISTORY_LIMIT',
              limit: Math.max(10, Number(event.target.value) || 10),
            })
          }
        />
      </Section>

      <Section title="Layout density">
        <div className={styles.segmented} role="radiogroup" aria-label="Layout density">
          {DENSITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={settings.layoutDensity === option.id}
              className={cx(
                styles.segmentButton,
                settings.layoutDensity === option.id && styles.segmentActive,
              )}
              onClick={() => dispatch({ type: 'SET_LAYOUT_DENSITY', density: option.id })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Default calculator">
        <select
          className={styles.numberInput}
          style={{ width: '100%' }}
          aria-label="Default calculator"
          value={settings.defaultMode}
          onChange={(event) => dispatch({ type: 'SET_DEFAULT_MODE', modeId: event.target.value })}
        >
          <option value="last-used">Remember last used</option>
          {AVAILABLE_MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Preferences">
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(event) =>
              dispatch({ type: 'SET_SOUND_ENABLED', enabled: event.target.checked })
            }
          />
          Sound effects
        </label>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={settings.hapticsEnabled}
            onChange={(event) =>
              dispatch({ type: 'SET_HAPTICS_ENABLED', enabled: event.target.checked })
            }
          />
          Haptic feedback
        </label>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(event) =>
              dispatch({ type: 'SET_REDUCED_MOTION', enabled: event.target.checked })
            }
          />
          Reduce motion
        </label>
      </Section>

      <button type="button" className={styles.resetButton} onClick={() => setConfirmOpen(true)}>
        <FiRotateCcw /> Reset to defaults
      </button>

      <Modal open={confirmOpen} title="Reset settings?" onClose={() => setConfirmOpen(false)}>
        <p>This restores every setting to its default value. History and memory are kept.</p>
        <div className={styles.confirmActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => {
              dispatch({ type: 'RESET_SETTINGS' });
              setConfirmOpen(false);
            }}
          >
            Yes, reset
          </button>
        </div>
      </Modal>
    </div>
  );
}
