import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
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

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <MotionConfigBridge>
        <HistoryProvider>
          <MemoryProvider>
            <CalculatorProvider>{children}</CalculatorProvider>
          </MemoryProvider>
        </HistoryProvider>
      </MotionConfigBridge>
    </SettingsProvider>
  );
}
