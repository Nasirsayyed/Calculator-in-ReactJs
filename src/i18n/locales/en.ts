import type { TranslationResource } from '../resource';

// English is the source of truth: every other locale file is typed against
// this shape, and its values must stay identical to the app's original
// hardcoded strings so the existing (English-only) test suite keeps passing
// unmodified.
const en: TranslationResource = {
  nav: {
    brand: 'Calculator',
    tabStandard: 'Standard',
    tabScientific: 'Scientific',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    browseCalculators: 'Browse calculators',
    openMemory: 'Open memory',
    openHistory: 'Open history',
    openSettings: 'Open settings',
  },
  footer: {
    text: 'Calculator Platform',
  },
  sidebar: {
    history: 'History',
    memory: 'Memory',
    settings: 'Settings',
    calculators: 'Calculators',
  },
  modes: {
    searchPlaceholder: 'Search calculators',
    noMatches: 'No calculators match "{{query}}".',
    comingSoon: 'Coming soon',
    category: {
      Core: 'Core',
      Finance: 'Finance',
      'Health & Date': 'Health & Date',
      Utility: 'Utility',
      Math: 'Math',
    },
  },
  settings: {
    theme: 'Theme',
    themeOptions: {
      light: 'Light',
      dark: 'Dark',
      amoled: 'AMOLED',
      'high-contrast': 'High Contrast',
    },
    accentColor: 'Accent color',
    accentColorSwatch: 'Accent color {{color}}',
    highContrastNote:
      'High Contrast uses a fixed, AA-safe accent - switch themes to customize this.',
    fontSize: 'Font size',
    buttonSize: 'Button size',
    animationSpeed: 'Animation speed',
    decimalPrecision: 'Decimal precision',
    historyLimit: 'History limit',
    layoutDensity: 'Layout density',
    density: {
      comfortable: 'Comfortable',
      compact: 'Compact',
    },
    defaultCalculator: 'Default calculator',
    rememberLastUsed: 'Remember last used',
    language: 'Language',
    preferences: 'Preferences',
    soundEffects: 'Sound effects',
    hapticFeedback: 'Haptic feedback',
    reduceMotion: 'Reduce motion',
    resetToDefaults: 'Reset to defaults',
    resetModalTitle: 'Reset settings?',
    resetModalBody:
      'This restores every setting to its default value. History and memory are kept.',
    confirmReset: 'Yes, reset',
  },
  common: {
    cancel: 'Cancel',
    closeDialog: 'Close {{title}}',
  },
};

export default en;
