import type { AngleMode } from './calculator';

export type ThemeName = 'light' | 'dark' | 'amoled' | 'high-contrast';

export type LayoutDensity = 'comfortable' | 'compact';

export interface Settings {
  theme: ThemeName;
  accentColor: string;
  fontSize: number;
  buttonSize: number;
  animationSpeed: number;
  decimalPrecision: number;
  angleMode: AngleMode;
  historyLimit: number;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  layoutDensity: LayoutDensity;
  reducedMotion: boolean;
  /** A calculator mode id (see CALCULATOR_MODES), or 'last-used' to reopen
   * whichever calculator was open when the app was last closed. */
  defaultMode: string;
}
