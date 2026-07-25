import type { ReactNode } from 'react';
import { Navbar } from '@components/Navbar';
import { Footer } from '@components/Footer';
import styles from './Layout.module.css';

export interface LayoutProps {
  children: ReactNode;
  onOpenHistory: () => void;
  onOpenMemory: () => void;
  onOpenSettings: () => void;
  onOpenModes: () => void;
}

export function Layout({
  children,
  onOpenHistory,
  onOpenMemory,
  onOpenSettings,
  onOpenModes,
}: LayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Navbar
          onOpenHistory={onOpenHistory}
          onOpenMemory={onOpenMemory}
          onOpenSettings={onOpenSettings}
          onOpenModes={onOpenModes}
        />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
