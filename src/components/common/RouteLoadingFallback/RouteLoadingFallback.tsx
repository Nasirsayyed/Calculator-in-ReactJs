import { useTranslation } from 'react-i18next';
import styles from './RouteLoadingFallback.module.css';

/** Suspense fallback shown while a lazily-loaded calculator page's chunk downloads. */
export function RouteLoadingFallback() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{t('common.loading')}</span>
    </div>
  );
}
