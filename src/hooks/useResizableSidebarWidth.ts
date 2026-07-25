import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { readFromStorage, writeToStorage } from '@services/storage';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { useMediaQuery } from './useMediaQuery';

const DEFAULT_WIDTH = 380;
const MIN_WIDTH = 320;
const MAX_WIDTH = 640;
const DESKTOP_QUERY = '(min-width: 768px)';

function clamp(value: number): number {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, value));
}

export interface UseResizableSidebarWidthResult {
  /** Only true at desktop widths - resizing a drawer that already fills the
   * screen on a phone isn't a meaningful interaction. */
  isResizable: boolean;
  width: number;
  isResizing: boolean;
  onResizeHandlePointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
}

/**
 * Drag-to-resize width for the History/Memory/Settings/Modes sidebars,
 * shared across all of them and persisted to localStorage. The panel is
 * always anchored to the physical right edge of the screen (see
 * Sidebar.module.css - unaffected by RTL, same as a toast staying in one
 * screen corner regardless of text direction), so the handle always sits on
 * its left edge and dragging left always grows the panel.
 */
export function useResizableSidebarWidth(): UseResizableSidebarWidthResult {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [width, setWidth] = useState(() =>
    clamp(readFromStorage(STORAGE_KEYS.sidebarWidth, DEFAULT_WIDTH)),
  );
  const [isResizing, setIsResizing] = useState(false);
  const dragStateRef = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    writeToStorage(STORAGE_KEYS.sidebarWidth, width);
  }, [width]);

  useEffect(() => {
    if (!isResizing) return;

    function handlePointerMove(event: PointerEvent) {
      const dragState = dragStateRef.current;
      if (!dragState) return;
      setWidth(clamp(dragState.startWidth + (dragState.startX - event.clientX)));
    }

    function handlePointerUp() {
      dragStateRef.current = null;
      setIsResizing(false);
    }

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
    };
  }, [isResizing]);

  const onResizeHandlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      dragStateRef.current = { startX: event.clientX, startWidth: width };
      setIsResizing(true);
    },
    [width],
  );

  return { isResizable: isDesktop, width, isResizing, onResizeHandlePointerDown };
}
