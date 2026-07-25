import { AnimatePresence, motion } from 'framer-motion';
import { useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import { IconButton } from '@components/common/IconButton';
import { useDialogA11y } from '../../hooks/useDialogA11y';
import { useResizableSidebarWidth } from '../../hooks/useResizableSidebarWidth';
import { cx } from '@utils/classNames';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Sidebar({ open, title, onClose, children }: SidebarProps) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement | null>(null);
  useDialogA11y(open, onClose, panelRef);
  const { isResizable, width, isResizing, onResizeHandlePointerDown } = useResizableSidebarWidth();

  // Portaled to <body> - AppShell renders Sidebars as children of Layout,
  // which lands them inside `.content` (a `backdrop-filter` ancestor).
  // `backdrop-filter` establishes a new containing block for `position:
  // fixed` descendants per spec, so without the portal this "fixed,
  // viewport-edge-anchored drawer" would actually be constrained to that
  // small centered content box - invisible at phone widths where the box is
  // nearly viewport-wide, but badly broken on any wider screen (the drawer
  // opens mid-page instead of sliding in from the real screen edge).
  return createPortal(
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
            style={isResizable ? ({ '--sidebar-width': `${width}px` } as CSSProperties) : undefined}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
          >
            {isResizable && (
              // A pointer-drag-only resize grip; keyboard users are unaffected
              // since the panel remains fully usable at its default width
              // without ever touching this handle.
              <div
                className={cx(styles.resizeHandle, isResizing && styles.resizeHandleActive)}
                onPointerDown={onResizeHandlePointerDown}
                aria-hidden="true"
              />
            )}
            <div className={styles.header}>
              <span className={styles.title}>{title}</span>
              <IconButton ariaLabel={t('common.closeDialog', { title })} onClick={onClose}>
                <FiX />
              </IconButton>
            </div>
            <div className={styles.body}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
