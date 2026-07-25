import type { ReactNode } from 'react';
import { PageHeader } from '@components/common/PageHeader';
import styles from './FormPage.module.css';

export interface FormPageProps {
  title: string;
  fields: ReactNode;
  result: ReactNode;
}

/** Consistent shell for every form-based utility calculator: back link + title, input fields, result. */
export function FormPage({ title, fields, result }: FormPageProps) {
  return (
    <div className={styles.page}>
      <PageHeader title={title} />
      <div className={styles.fields}>{fields}</div>
      {result}
    </div>
  );
}
