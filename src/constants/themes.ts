import type { ThemeName } from '@app-types/settings';

export interface ThemeDescriptor {
  id: ThemeName;
  label: string;
}

export const THEMES: ThemeDescriptor[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'amoled', label: 'AMOLED' },
  { id: 'high-contrast', label: 'High Contrast' },
];

export const DEFAULT_ACCENT = '#6c5ce7'; // violet

export interface AccentPreset {
  color: string;
  /** Text color to place on top of `color` - chosen per-swatch so every
   * preset clears WCAG AA (4.5:1) for the white-on-accent buttons/tabs that
   * use it. Forcing one fixed text color for every hue would either fail
   * contrast on light hues (yellow, teal) or force them into muddy, darker
   * versions of themselves just to stay legible with white text. */
  contrastColor: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { color: DEFAULT_ACCENT, contrastColor: '#ffffff' }, // violet - 4.86:1 with white
  { color: '#0984e3', contrastColor: '#000000' }, // blue - 5.42:1 with black
  { color: '#00b894', contrastColor: '#000000' }, // green - 8.28:1 with black
  { color: '#e17055', contrastColor: '#000000' }, // orange - 6.65:1 with black
  { color: '#d63031', contrastColor: '#ffffff' }, // red - 4.85:1 with white
  { color: '#e84393', contrastColor: '#000000' }, // pink - 5.66:1 with black
  { color: '#fdcb6e', contrastColor: '#000000' }, // amber - 13.94:1 with black
  { color: '#00cec9', contrastColor: '#000000' }, // teal - 10.67:1 with black
];

export function getAccentContrastColor(color: string): string {
  return ACCENT_PRESETS.find((preset) => preset.color === color)?.contrastColor ?? '#ffffff';
}

/** Resolves the theme to use before any user preference has been saved. */
export function resolveSystemDefaultTheme(): ThemeName {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
