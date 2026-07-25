import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { IconButton } from '@components/common/IconButton';
import { useDialogA11y } from '../../hooks/useDialogA11y';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Sidebar({ open, title, onClose, children }: SidebarProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useDialogA11y(open, onClose, panelRef);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          {/* A generic div, not <aside>, because <aside>'s implicit
              "complementary" landmark role conflicts with role="dialog". */}
          <motion.div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
          >
            <div className={styles.header}>
              <span className={styles.title}>{title}</span>
              <IconButton ariaLabel={`Close ${title}`} onClick={onClose}>
                <FiX />
              </IconButton>
            </div>
            <div className={styles.body}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
