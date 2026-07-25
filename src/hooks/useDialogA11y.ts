import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Tracks currently-open dialogs/panels so that when one opens on top of
// another (e.g. a confirmation Modal over a Sidebar), only the topmost one
// responds to Escape and traps Tab - the one underneath stays inert until
// the one on top closes.
const dialogStack: symbol[] = [];

/** True while any Sidebar or Modal is open - lets other global key handlers
 * (e.g. calculator keyboard shortcuts) stand down while a dialog owns input. */
export function isAnyDialogOpen(): boolean {
  return dialogStack.length > 0;
}

/**
 * Standard dialog/panel accessibility behavior: moves focus inside on open,
 * restores it to the triggering element on close, closes on Escape, and
 * traps Tab/Shift+Tab so focus can't escape to the page behind it. Aware of
 * nested dialogs - only the topmost open one reacts to keyboard input.
 */
export function useDialogA11y(
  open: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const dialogId = useRef(Symbol('dialog'));

  useEffect(() => {
    if (!open) return;
    const id = dialogId.current;
    dialogStack.push(id);
    return () => {
      const index = dialogStack.indexOf(id);
      if (index !== -1) dialogStack.splice(index, 1);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusable?.[0] ?? containerRef.current)?.focus();
    } else {
      previouslyFocused.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run on open/close transitions
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      const isTopmost = dialogStack[dialogStack.length - 1] === dialogId.current;
      if (!isTopmost) return;

      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const container = containerRef.current;
      if (!container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, containerRef]);
}
