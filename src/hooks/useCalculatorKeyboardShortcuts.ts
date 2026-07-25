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

const NON_TEXT_INPUT_TYPES = new Set(['button', 'submit', 'checkbox', 'radio', 'range', 'color']);

/** True when the focused element is a genuine text-entry control (a text
 * input or textarea elsewhere on the page, e.g. the natural-language input)
 * - digits/operators typed there must reach it instead of being hijacked
 * into the calculator's own expression. */
function isTextEntryFocused(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  if (el.tagName === 'TEXTAREA') return true;
  if (el.tagName === 'INPUT') return !NON_TEXT_INPUT_TYPES.has((el as HTMLInputElement).type);
  return false;
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
      // Let a focused text input/textarea elsewhere on the page (e.g. the
      // natural-language input) receive its own digits/operators instead of
      // having them hijacked into the calculator's expression.
      if (DIRECT_INPUT_KEYS.has(event.key) && isTextEntryFocused()) return;

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
