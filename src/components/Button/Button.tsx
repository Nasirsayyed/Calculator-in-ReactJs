import { motion } from 'framer-motion';
import { useCallback, useState, type MouseEvent, type ReactNode } from 'react';
import { cx } from '@utils/classNames';
import type { ButtonVariant } from '@app-types/button';
import styles from './Button.module.css';

export type { ButtonVariant };

export interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  ariaLabel?: string;
  wide?: boolean;
  disabled?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleId = 0;

export function Button({
  children,
  onClick,
  variant = 'default',
  ariaLabel,
  wide,
  disabled,
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawnRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const id = rippleId++;
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size },
    ]);
    window.setTimeout(() => setRipples((prev) => prev.filter((ripple) => ripple.id !== id)), 500);
  }, []);

  return (
    <motion.button
      type="button"
      className={cx(styles.button, styles[variant], wide && styles.wide)}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseDown={spawnRipple}
      disabled={disabled}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.12 }}
    >
      <span className={styles.label}>{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
          aria-hidden="true"
        />
      ))}
    </motion.button>
  );
}
