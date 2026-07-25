import { AnimatePresence, motion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useDialogA11y } from '../../../hooks/useDialogA11y';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  useDialogA11y(open, onClose, cardRef);

  // Portaled to <body> - this can be opened from inside a Sidebar, which
  // sits inside `.content` (a `backdrop-filter` ancestor). `backdrop-filter`
  // establishes a new containing block for `position: fixed` descendants
  // per spec, so without the portal this `fixed` backdrop/card would be
  // constrained to that small centered box instead of covering the
  // viewport - invisible at phone widths where the box is nearly
  // viewport-wide, but badly broken on any wider screen.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            ref={cardRef}
            className={styles.card}
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
          >
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.body}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
