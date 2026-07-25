import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cx } from '@utils/classNames';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  active?: boolean;
}

export function IconButton({ children, onClick, ariaLabel, active }: IconButtonProps) {
  return (
    <motion.button
      type="button"
      className={cx(styles.iconButton, active && styles.active)}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
}
