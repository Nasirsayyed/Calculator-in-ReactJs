import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import ar from './locales/ar';

// Initialized once, at module load, as a side effect - react-i18next's
// useTranslation() reads from this default global instance, so no
// <I18nextProvider> wrapper is required (keeping every existing render()
// call across the test suite untouched).
if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

export default i18next;
