import { DEFAULT_ACCENT, resolveSystemDefaultTheme } from '@constants/themes';
import type { AngleMode } from '@app-types/calculator';
import type { LayoutDensity, Settings, ThemeName } from '@app-types/settings';

export function createDefaultSettings(): Settings {
  return {
    theme: resolveSystemDefaultTheme(),
    accentColor: DEFAULT_ACCENT,
    fontSize: 1,
    buttonSize: 1,
    animationSpeed: 1,
    decimalPrecision: 10,
    angleMode: 'deg',
    historyLimit: 200,
    soundEnabled: false,
    hapticsEnabled: true,
    layoutDensity: 'comfortable',
    reducedMotion: false,
    defaultMode: 'standard',
  };
}

export type SettingsAction =
  | { type: 'SET_THEME'; theme: ThemeName }
  | { type: 'SET_ACCENT_COLOR'; color: string }
  | { type: 'SET_FONT_SIZE'; size: number }
  | { type: 'SET_BUTTON_SIZE'; size: number }
  | { type: 'SET_ANIMATION_SPEED'; speed: number }
  | { type: 'SET_DECIMAL_PRECISION'; precision: number }
  | { type: 'SET_ANGLE_MODE'; angleMode: AngleMode }
  | { type: 'SET_HISTORY_LIMIT'; limit: number }
  | { type: 'SET_SOUND_ENABLED'; enabled: boolean }
  | { type: 'SET_HAPTICS_ENABLED'; enabled: boolean }
  | { type: 'SET_LAYOUT_DENSITY'; density: LayoutDensity }
  | { type: 'SET_REDUCED_MOTION'; enabled: boolean }
  | { type: 'SET_DEFAULT_MODE'; modeId: string }
  | { type: 'RESET_SETTINGS' };

export function settingsReducer(state: Settings, action: SettingsAction): Settings {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'SET_ACCENT_COLOR':
      return { ...state, accentColor: action.color };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.size };
    case 'SET_BUTTON_SIZE':
      return { ...state, buttonSize: action.size };
    case 'SET_ANIMATION_SPEED':
      return { ...state, animationSpeed: action.speed };
    case 'SET_DECIMAL_PRECISION':
      return { ...state, decimalPrecision: action.precision };
    case 'SET_ANGLE_MODE':
      return { ...state, angleMode: action.angleMode };
    case 'SET_HISTORY_LIMIT':
      return { ...state, historyLimit: action.limit };
    case 'SET_SOUND_ENABLED':
      return { ...state, soundEnabled: action.enabled };
    case 'SET_HAPTICS_ENABLED':
      return { ...state, hapticsEnabled: action.enabled };
    case 'SET_LAYOUT_DENSITY':
      return { ...state, layoutDensity: action.density };
    case 'SET_REDUCED_MOTION':
      return { ...state, reducedMotion: action.enabled };
    case 'SET_DEFAULT_MODE':
      return { ...state, defaultMode: action.modeId };
    case 'RESET_SETTINGS':
      return createDefaultSettings();
    default:
      return state;
  }
}
