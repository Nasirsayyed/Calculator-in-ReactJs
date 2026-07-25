export interface SupportedLanguage {
  id: string;
  label: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { id: 'en', label: 'English', dir: 'ltr' },
  { id: 'es', label: 'Español', dir: 'ltr' },
  { id: 'fr', label: 'Français', dir: 'ltr' },
  { id: 'ar', label: 'العربية', dir: 'rtl' },
];

export function getLanguageDir(languageId: string): 'ltr' | 'rtl' {
  return SUPPORTED_LANGUAGES.find((lang) => lang.id === languageId)?.dir ?? 'ltr';
}
