import type { TranslationResource } from '../resource';

const ar: TranslationResource = {
  nav: {
    brand: 'الآلة الحاسبة',
    tabStandard: 'عادية',
    tabScientific: 'علمية',
    switchToLight: 'التبديل إلى الوضع الفاتح',
    switchToDark: 'التبديل إلى الوضع الداكن',
    browseCalculators: 'تصفح الآلات الحاسبة',
    openMemory: 'فتح الذاكرة',
    openHistory: 'فتح السجل',
    openSettings: 'فتح الإعدادات',
  },
  footer: {
    text: 'منصة الآلة الحاسبة',
  },
  sidebar: {
    history: 'السجل',
    memory: 'الذاكرة',
    settings: 'الإعدادات',
    calculators: 'الآلات الحاسبة',
  },
  modes: {
    searchPlaceholder: 'ابحث عن آلة حاسبة',
    noMatches: 'لا توجد آلة حاسبة مطابقة لـ "{{query}}".',
    comingSoon: 'قريباً',
    category: {
      Core: 'أساسي',
      Finance: 'مالية',
      'Health & Date': 'الصحة والتاريخ',
      Utility: 'أدوات',
      Math: 'رياضيات',
    },
  },
  settings: {
    theme: 'المظهر',
    themeOptions: {
      light: 'فاتح',
      dark: 'داكن',
      amoled: 'AMOLED',
      'high-contrast': 'تباين عالٍ',
    },
    accentColor: 'لون التمييز',
    accentColorSwatch: 'لون التمييز {{color}}',
    highContrastNote: 'يستخدم التباين العالي لوناً ثابتاً يحقق معايير AA - غيّر المظهر لتخصيصه.',
    fontSize: 'حجم الخط',
    buttonSize: 'حجم الأزرار',
    animationSpeed: 'سرعة الحركة',
    decimalPrecision: 'دقة الأرقام العشرية',
    historyLimit: 'حد السجل',
    layoutDensity: 'كثافة التخطيط',
    density: {
      comfortable: 'مريح',
      compact: 'مضغوط',
    },
    defaultCalculator: 'الآلة الحاسبة الافتراضية',
    rememberLastUsed: 'تذكر آخر آلة مستخدمة',
    language: 'اللغة',
    preferences: 'التفضيلات',
    soundEffects: 'المؤثرات الصوتية',
    hapticFeedback: 'التغذية الراجعة اللمسية',
    reduceMotion: 'تقليل الحركة',
    resetToDefaults: 'إعادة الضبط الافتراضي',
    resetModalTitle: 'إعادة ضبط الإعدادات؟',
    resetModalBody:
      'سيؤدي هذا إلى إعادة كل إعداد إلى قيمته الافتراضية. سيتم الاحتفاظ بالسجل والذاكرة.',
    confirmReset: 'نعم، أعد الضبط',
  },
  common: {
    cancel: 'إلغاء',
    closeDialog: 'إغلاق {{title}}',
  },
};

export default ar;
