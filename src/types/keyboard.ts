import type { ReactNode } from 'react';
import type { ButtonVariant } from './button';

export type KeyAction = 'input' | 'clear' | 'delete' | 'equals' | 'toggleSign';

export interface KeyDescriptor {
  label: ReactNode;
  value: string;
  variant: ButtonVariant;
  action: KeyAction;
  wide?: boolean;
  ariaLabel?: string;
}
