export interface TranslationResource {
  nav: {
    brand: string;
    tabStandard: string;
    tabScientific: string;
    switchToLight: string;
    switchToDark: string;
    browseCalculators: string;
    openMemory: string;
    openHistory: string;
    openSettings: string;
  };
  footer: {
    text: string;
  };
  sidebar: {
    history: string;
    memory: string;
    settings: string;
    calculators: string;
  };
  modes: {
    searchPlaceholder: string;
    noMatches: string;
    comingSoon: string;
    category: {
      Core: string;
      Finance: string;
      'Health & Date': string;
      Utility: string;
      Math: string;
    };
  };
  settings: {
    theme: string;
    themeOptions: {
      light: string;
      dark: string;
      amoled: string;
      'high-contrast': string;
    };
    accentColor: string;
    accentColorSwatch: string;
    highContrastNote: string;
    fontSize: string;
    buttonSize: string;
    animationSpeed: string;
    decimalPrecision: string;
    historyLimit: string;
    layoutDensity: string;
    density: {
      comfortable: string;
      compact: string;
    };
    defaultCalculator: string;
    rememberLastUsed: string;
    language: string;
    preferences: string;
    soundEffects: string;
    hapticFeedback: string;
    reduceMotion: string;
    resetToDefaults: string;
    resetModalTitle: string;
    resetModalBody: string;
    confirmReset: string;
  };
  common: {
    cancel: string;
    closeDialog: string;
  };
}
