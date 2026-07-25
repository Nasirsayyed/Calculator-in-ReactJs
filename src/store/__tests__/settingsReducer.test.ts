import { describe, expect, it } from 'vitest';
import { createDefaultSettings, settingsReducer } from '../settingsReducer';

describe('settingsReducer', () => {
  it('creates sensible defaults', () => {
    const defaults = createDefaultSettings();
    expect(defaults.decimalPrecision).toBe(10);
    expect(defaults.angleMode).toBe('deg');
    expect(defaults.historyLimit).toBeGreaterThan(0);
  });

  it('updates theme, accent, and density independently', () => {
    let state = createDefaultSettings();
    state = settingsReducer(state, { type: 'SET_THEME', theme: 'dark' });
    state = settingsReducer(state, { type: 'SET_ACCENT_COLOR', color: '#0984e3' });
    state = settingsReducer(state, { type: 'SET_LAYOUT_DENSITY', density: 'compact' });

    expect(state.theme).toBe('dark');
    expect(state.accentColor).toBe('#0984e3');
    expect(state.layoutDensity).toBe('compact');
  });

  it('toggles sound, haptics, and reduced motion', () => {
    let state = createDefaultSettings();
    state = settingsReducer(state, { type: 'SET_SOUND_ENABLED', enabled: true });
    state = settingsReducer(state, { type: 'SET_HAPTICS_ENABLED', enabled: false });
    state = settingsReducer(state, { type: 'SET_REDUCED_MOTION', enabled: true });

    expect(state.soundEnabled).toBe(true);
    expect(state.hapticsEnabled).toBe(false);
    expect(state.reducedMotion).toBe(true);
  });

  it('updates font size, button size, animation speed, angle mode, and history limit', () => {
    let state = createDefaultSettings();
    state = settingsReducer(state, { type: 'SET_FONT_SIZE', size: 1.2 });
    state = settingsReducer(state, { type: 'SET_BUTTON_SIZE', size: 0.9 });
    state = settingsReducer(state, { type: 'SET_ANIMATION_SPEED', speed: 0 });
    state = settingsReducer(state, { type: 'SET_ANGLE_MODE', angleMode: 'rad' });
    state = settingsReducer(state, { type: 'SET_HISTORY_LIMIT', limit: 500 });

    expect(state.fontSize).toBe(1.2);
    expect(state.buttonSize).toBe(0.9);
    expect(state.animationSpeed).toBe(0);
    expect(state.angleMode).toBe('rad');
    expect(state.historyLimit).toBe(500);
  });

  it('updates the default calculator mode', () => {
    let state = createDefaultSettings();
    expect(state.defaultMode).toBe('standard');
    state = settingsReducer(state, { type: 'SET_DEFAULT_MODE', modeId: 'bmi' });
    expect(state.defaultMode).toBe('bmi');
  });

  it('resets to defaults, discarding prior customization', () => {
    let state = createDefaultSettings();
    state = settingsReducer(state, { type: 'SET_THEME', theme: 'amoled' });
    state = settingsReducer(state, { type: 'SET_DECIMAL_PRECISION', precision: 2 });
    state = settingsReducer(state, { type: 'RESET_SETTINGS' });

    expect(state.theme).not.toBe('amoled');
    expect(state.decimalPrecision).toBe(10);
  });

  it('ignores unknown action types', () => {
    const state = createDefaultSettings();
    // @ts-expect-error - intentionally invalid action for the default branch
    const next = settingsReducer(state, { type: 'NOT_A_REAL_ACTION' });
    expect(next).toBe(state);
  });
});
