import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { setAngleMode } from '@parser/mathEngine';
import { readFromStorage, writeToStorage } from '@services/storage';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { getAccentContrastColor } from '@constants/themes';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { createDefaultSettings, settingsReducer } from '@store/settingsReducer';
import { SettingsContext, type SettingsContextValue } from './SettingsContext';
import type { Settings } from '@app-types/settings';

function loadInitialSettings(): Settings {
  return readFromStorage(STORAGE_KEYS.theme, createDefaultSettings());
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, undefined, loadInitialSettings);
  const systemReducedMotion = usePrefersReducedMotion();
  const effectiveReducedMotion = settings.reducedMotion || systemReducedMotion;

  useEffect(() => {
    writeToStorage(STORAGE_KEYS.theme, settings);
  }, [settings]);

  useEffect(() => {
    setAngleMode(settings.angleMode);
  }, [settings.angleMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    // High Contrast guarantees an AA-safe accent by design - a custom accent
    // color (an inline style, which always outranks the theme's stylesheet
    // rule) must not be allowed to quietly defeat that guarantee.
    if (settings.theme === 'high-contrast') {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-contrast');
    } else {
      root.style.setProperty('--accent', settings.accentColor);
      root.style.setProperty('--accent-contrast', getAccentContrastColor(settings.accentColor));
    }
    root.style.setProperty('--font-scale', String(settings.fontSize));
    root.style.setProperty('--button-scale', String(settings.buttonSize));
    root.style.setProperty(
      '--motion-scale',
      effectiveReducedMotion ? '0' : String(settings.animationSpeed),
    );
    root.style.setProperty('--space-unit', settings.layoutDensity === 'compact' ? '6px' : '8px');
  }, [settings, effectiveReducedMotion]);

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, dispatch, effectiveReducedMotion }),
    [settings, effectiveReducedMotion],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
