import { MotionConfig } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import i18n from '@/i18n/i18n';
import { getLanguageDir } from '@/i18n/languages';
import { SettingsProvider } from './SettingsProvider';
import { useSettings } from './SettingsContext';
import { CalculatorProvider } from './CalculatorProvider';
import { HistoryProvider } from './HistoryProvider';
import { MemoryProvider } from './MemoryProvider';

function MotionConfigBridge({ children }: { children: ReactNode }) {
  const { effectiveReducedMotion } = useSettings();
  return (
    <MotionConfig reducedMotion={effectiveReducedMotion ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  );
}

/** Keeps i18next, <html lang>, and <html dir> (for RTL languages) in sync
 * with the persisted language setting. */
function I18nBridge({ children }: { children: ReactNode }) {
  const { settings } = useSettings();

  useEffect(() => {
    void i18n.changeLanguage(settings.language);
    document.documentElement.lang = settings.language;
    document.documentElement.dir = getLanguageDir(settings.language);
  }, [settings.language]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <I18nBridge>
        <MotionConfigBridge>
          <HistoryProvider>
            <MemoryProvider>
              <CalculatorProvider>{children}</CalculatorProvider>
            </MemoryProvider>
          </HistoryProvider>
        </MotionConfigBridge>
      </I18nBridge>
    </SettingsProvider>
  );
}
