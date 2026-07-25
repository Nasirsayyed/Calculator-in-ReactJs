import { useEffect } from 'react';
import { useCalculator } from '@context/CalculatorContext';
import { isAnyDialogOpen } from './useDialogA11y';

const DIRECT_INPUT_KEYS = new Set('0123456789.+-*/^%()'.split(''));
const ACTIVATION_KEYS = new Set(['Enter', ' ']);

/** True when the currently focused element already has its own native
 * meaning for Enter/Space (a button, tab, link, or form field) - in that
 * case the global shortcut must not also fire, or the key would double-act. */
function isInteractiveElementFocused(): boolean {
  const el = document.activeElement;
  if (!el || el === document.body) return false;
  if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(el.tagName)) return true;
  const role = el.getAttribute('role');
  return role === 'tab' || role === 'radio' || role === 'button';
}

/** Wires the physical keyboard to the active calculator's input actions. */
export function useCalculatorKeyboardShortcuts(): void {
  const { input, clear, deleteLast, equals } = useCalculator();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      // A Sidebar/Modal is open and owns keyboard input (its own Escape/Tab
      // handling takes over) - don't also mutate the calculator underneath.
      if (isAnyDialogOpen()) return;
      // Let a focused button/tab/input/link handle its own Enter or Space.
      if (ACTIVATION_KEYS.has(event.key) && isInteractiveElementFocused()) return;

      if (DIRECT_INPUT_KEYS.has(event.key)) {
        event.preventDefault();
        input(event.key);
        return;
      }

      switch (event.key) {
        case 'Enter':
        case '=':
          event.preventDefault();
          equals();
          break;
        case 'Backspace':
          event.preventDefault();
          deleteLast();
          break;
        case 'Escape':
          event.preventDefault();
          clear();
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, clear, deleteLast, equals]);
}
