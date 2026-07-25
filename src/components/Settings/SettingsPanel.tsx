import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FiRotateCcw } from 'react-icons/fi';
import { useSettings } from '@context/SettingsContext';
import { Modal } from '@components/common/Modal';
import { cx } from '@utils/classNames';
import { ACCENT_PRESETS, THEMES } from '@constants/themes';
import { CALCULATOR_MODES } from '@constants/calculatorModes';
import { SUPPORTED_LANGUAGES } from '@/i18n/languages';
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

const DENSITY_OPTIONS: LayoutDensity[] = ['comfortable', 'compact'];

export function SettingsPanel() {
  const { t } = useTranslation();
  const { settings, dispatch } = useSettings();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className={styles.panel}>
      <Section title={t('settings.theme')}>
        <div className={styles.segmented} role="radiogroup" aria-label={t('settings.theme')}>
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
              {t(`settings.themeOptions.${theme.id}`)}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t('settings.accentColor')}>
        {settings.theme === 'high-contrast' ? (
          <p
            className={styles.sectionTitle}
            style={{ textTransform: 'none', letterSpacing: 'normal' }}
          >
            {t('settings.highContrastNote')}
          </p>
        ) : (
          <div className={styles.swatches} role="radiogroup" aria-label={t('settings.accentColor')}>
            {ACCENT_PRESETS.map(({ color }) => (
              <button
                key={color}
                type="button"
                role="radio"
                aria-checked={settings.accentColor === color}
                aria-label={t('settings.accentColorSwatch', { color })}
                className={cx(styles.swatch, settings.accentColor === color && styles.swatchActive)}
                style={{ background: color }}
                onClick={() => dispatch({ type: 'SET_ACCENT_COLOR', color })}
              />
            ))}
          </div>
        )}
      </Section>

      <Section title={t('settings.fontSize')}>
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0.85}
            max={1.3}
            step={0.05}
            value={settings.fontSize}
            aria-label={t('settings.fontSize')}
            onChange={(event) =>
              dispatch({ type: 'SET_FONT_SIZE', size: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{Math.round(settings.fontSize * 100)}%</span>
        </div>
      </Section>

      <Section title={t('settings.buttonSize')}>
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0.85}
            max={1.3}
            step={0.05}
            value={settings.buttonSize}
            aria-label={t('settings.buttonSize')}
            onChange={(event) =>
              dispatch({ type: 'SET_BUTTON_SIZE', size: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{Math.round(settings.buttonSize * 100)}%</span>
        </div>
      </Section>

      <Section title={t('settings.animationSpeed')}>
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={2}
            step={0.1}
            value={settings.animationSpeed}
            aria-label={t('settings.animationSpeed')}
            onChange={(event) =>
              dispatch({ type: 'SET_ANIMATION_SPEED', speed: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{settings.animationSpeed.toFixed(1)}x</span>
        </div>
      </Section>

      <Section title={t('settings.decimalPrecision')}>
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={15}
            step={1}
            value={settings.decimalPrecision}
            aria-label={t('settings.decimalPrecision')}
            onChange={(event) =>
              dispatch({ type: 'SET_DECIMAL_PRECISION', precision: Number(event.target.value) })
            }
          />
          <span className={styles.sliderValue}>{settings.decimalPrecision}</span>
        </div>
      </Section>

      <Section title={t('settings.historyLimit')}>
        <input
          type="number"
          className={styles.numberInput}
          min={10}
          max={2000}
          step={10}
          value={settings.historyLimit}
          aria-label={t('settings.historyLimit')}
          onChange={(event) =>
            dispatch({
              type: 'SET_HISTORY_LIMIT',
              limit: Math.max(10, Number(event.target.value) || 10),
            })
          }
        />
      </Section>

      <Section title={t('settings.layoutDensity')}>
        <div
          className={styles.segmented}
          role="radiogroup"
          aria-label={t('settings.layoutDensity')}
        >
          {DENSITY_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={settings.layoutDensity === option}
              className={cx(
                styles.segmentButton,
                settings.layoutDensity === option && styles.segmentActive,
              )}
              onClick={() => dispatch({ type: 'SET_LAYOUT_DENSITY', density: option })}
            >
              {t(`settings.density.${option}`)}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t('settings.defaultCalculator')}>
        <select
          className={styles.numberInput}
          style={{ width: '100%' }}
          aria-label={t('settings.defaultCalculator')}
          value={settings.defaultMode}
          onChange={(event) => dispatch({ type: 'SET_DEFAULT_MODE', modeId: event.target.value })}
        >
          <option value="last-used">{t('settings.rememberLastUsed')}</option>
          {AVAILABLE_MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
      </Section>

      <Section title={t('settings.language')}>
        <select
          className={styles.numberInput}
          style={{ width: '100%' }}
          aria-label={t('settings.language')}
          value={settings.language}
          onChange={(event) => dispatch({ type: 'SET_LANGUAGE', language: event.target.value })}
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <option key={language.id} value={language.id}>
              {language.label}
            </option>
          ))}
        </select>
      </Section>

      <Section title={t('settings.preferences')}>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(event) =>
              dispatch({ type: 'SET_SOUND_ENABLED', enabled: event.target.checked })
            }
          />
          {t('settings.soundEffects')}
        </label>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={settings.hapticsEnabled}
            onChange={(event) =>
              dispatch({ type: 'SET_HAPTICS_ENABLED', enabled: event.target.checked })
            }
          />
          {t('settings.hapticFeedback')}
        </label>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(event) =>
              dispatch({ type: 'SET_REDUCED_MOTION', enabled: event.target.checked })
            }
          />
          {t('settings.reduceMotion')}
        </label>
      </Section>

      <button type="button" className={styles.resetButton} onClick={() => setConfirmOpen(true)}>
        <FiRotateCcw /> {t('settings.resetToDefaults')}
      </button>

      <Modal
        open={confirmOpen}
        title={t('settings.resetModalTitle')}
        onClose={() => setConfirmOpen(false)}
      >
        <p>{t('settings.resetModalBody')}</p>
        <div className={styles.confirmActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setConfirmOpen(false)}
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => {
              dispatch({ type: 'RESET_SETTINGS' });
              setConfirmOpen(false);
            }}
          >
            {t('settings.confirmReset')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
