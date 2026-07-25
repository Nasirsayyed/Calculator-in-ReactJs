import type { TranslationResource } from '../resource';

const es: TranslationResource = {
  nav: {
    brand: 'Calculadora',
    tabStandard: 'Estándar',
    tabScientific: 'Científica',
    switchToLight: 'Cambiar a tema claro',
    switchToDark: 'Cambiar a tema oscuro',
    browseCalculators: 'Explorar calculadoras',
    openMemory: 'Abrir memoria',
    openHistory: 'Abrir historial',
    openSettings: 'Abrir configuración',
  },
  footer: {
    text: 'Plataforma de Calculadora',
  },
  sidebar: {
    history: 'Historial',
    memory: 'Memoria',
    settings: 'Configuración',
    calculators: 'Calculadoras',
  },
  modes: {
    searchPlaceholder: 'Buscar calculadoras',
    noMatches: 'Ninguna calculadora coincide con "{{query}}".',
    comingSoon: 'Próximamente',
    category: {
      Core: 'Principal',
      Finance: 'Finanzas',
      'Health & Date': 'Salud y Fecha',
      Utility: 'Utilidad',
      Math: 'Matemáticas',
    },
  },
  settings: {
    theme: 'Tema',
    themeOptions: {
      light: 'Claro',
      dark: 'Oscuro',
      amoled: 'AMOLED',
      'high-contrast': 'Alto Contraste',
    },
    accentColor: 'Color de acento',
    accentColorSwatch: 'Color de acento {{color}}',
    highContrastNote:
      'Alto Contraste usa un acento fijo y seguro (AA) - cambia de tema para personalizarlo.',
    fontSize: 'Tamaño de fuente',
    buttonSize: 'Tamaño de botón',
    animationSpeed: 'Velocidad de animación',
    decimalPrecision: 'Precisión decimal',
    historyLimit: 'Límite de historial',
    layoutDensity: 'Densidad de diseño',
    density: {
      comfortable: 'Cómodo',
      compact: 'Compacto',
    },
    defaultCalculator: 'Calculadora predeterminada',
    rememberLastUsed: 'Recordar la última usada',
    language: 'Idioma',
    preferences: 'Preferencias',
    soundEffects: 'Efectos de sonido',
    hapticFeedback: 'Retroalimentación háptica',
    reduceMotion: 'Reducir movimiento',
    resetToDefaults: 'Restablecer valores predeterminados',
    resetModalTitle: '¿Restablecer configuración?',
    resetModalBody:
      'Esto restaura todos los ajustes a sus valores predeterminados. El historial y la memoria se conservan.',
    confirmReset: 'Sí, restablecer',
  },
  common: {
    cancel: 'Cancelar',
    closeDialog: 'Cerrar {{title}}',
  },
};

export default es;
