import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { readFromStorage, writeToStorage } from '@services/storage';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { memoryReducer } from '@store/memoryReducer';
import { MemoryContext, type MemoryContextValue } from './MemoryContext';
import type { MemoryEntry } from '@app-types/memory';

function loadInitialMemory(): MemoryEntry[] {
  return readFromStorage<MemoryEntry[]>(STORAGE_KEYS.memory, []);
}

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [entries, dispatch] = useReducer(memoryReducer, undefined, loadInitialMemory);

  useEffect(() => {
    writeToStorage(STORAGE_KEYS.memory, entries);
  }, [entries]);

  const save = useCallback((value: number) => dispatch({ type: 'MEMORY_SAVE', value }), []);
  const add = useCallback((value: number) => dispatch({ type: 'MEMORY_ADD', value }), []);
  const subtract = useCallback((value: number) => dispatch({ type: 'MEMORY_SUBTRACT', value }), []);
  const clear = useCallback(() => dispatch({ type: 'MEMORY_CLEAR' }), []);
  const deleteEntry = useCallback((id: string) => dispatch({ type: 'MEMORY_DELETE', id }), []);
  const rename = useCallback(
    (id: string, label: string) => dispatch({ type: 'MEMORY_RENAME', id, label }),
    [],
  );

  const value = useMemo<MemoryContextValue>(
    () => ({ entries, save, add, subtract, clear, deleteEntry, rename }),
    [entries, save, add, subtract, clear, deleteEntry, rename],
  );

  return <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>;
}
