import { createContext, useContext, type Dispatch } from 'react';
import type { SettingsAction } from '@store/settingsReducer';
import type { Settings } from '@app-types/settings';

export interface SettingsContextValue {
  settings: Settings;
  dispatch: Dispatch<SettingsAction>;
  effectiveReducedMotion: boolean;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
}
