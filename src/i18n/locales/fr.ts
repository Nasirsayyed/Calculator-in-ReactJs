import type { TranslationResource } from '../resource';

const fr: TranslationResource = {
  nav: {
    brand: 'Calculatrice',
    tabStandard: 'Standard',
    tabScientific: 'Scientifique',
    switchToLight: 'Passer au thème clair',
    switchToDark: 'Passer au thème sombre',
    browseCalculators: 'Parcourir les calculatrices',
    openMemory: 'Ouvrir la mémoire',
    openHistory: "Ouvrir l'historique",
    openSettings: 'Ouvrir les paramètres',
  },
  footer: {
    text: 'Plateforme de Calculatrice',
  },
  sidebar: {
    history: 'Historique',
    memory: 'Mémoire',
    settings: 'Paramètres',
    calculators: 'Calculatrices',
  },
  modes: {
    searchPlaceholder: 'Rechercher des calculatrices',
    noMatches: 'Aucune calculatrice ne correspond à "{{query}}".',
    comingSoon: 'Bientôt disponible',
    category: {
      Core: 'Principal',
      Finance: 'Finance',
      'Health & Date': 'Santé et Date',
      Utility: 'Utilitaire',
      Math: 'Mathématiques',
    },
  },
  settings: {
    theme: 'Thème',
    themeOptions: {
      light: 'Clair',
      dark: 'Sombre',
      amoled: 'AMOLED',
      'high-contrast': 'Contraste élevé',
    },
    accentColor: "Couleur d'accent",
    accentColorSwatch: "Couleur d'accent {{color}}",
    highContrastNote:
      'Le contraste élevé utilise un accent fixe et conforme AA - changez de thème pour le personnaliser.',
    fontSize: 'Taille de police',
    buttonSize: 'Taille des boutons',
    animationSpeed: "Vitesse d'animation",
    decimalPrecision: 'Précision décimale',
    historyLimit: "Limite de l'historique",
    layoutDensity: 'Densité de mise en page',
    density: {
      comfortable: 'Confortable',
      compact: 'Compact',
    },
    defaultCalculator: 'Calculatrice par défaut',
    rememberLastUsed: 'Se souvenir de la dernière utilisée',
    language: 'Langue',
    preferences: 'Préférences',
    soundEffects: 'Effets sonores',
    hapticFeedback: 'Retour haptique',
    reduceMotion: 'Réduire les animations',
    resetToDefaults: 'Réinitialiser les paramètres',
    resetModalTitle: 'Réinitialiser les paramètres ?',
    resetModalBody:
      'Cela restaure tous les paramètres à leurs valeurs par défaut. L’historique et la mémoire sont conservés.',
    confirmReset: 'Oui, réinitialiser',
  },
  common: {
    cancel: 'Annuler',
    closeDialog: 'Fermer {{title}}',
  },
};

export default fr;
