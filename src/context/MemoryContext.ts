import { createContext, useContext } from 'react';
import type { MemoryEntry } from '@app-types/memory';

export interface MemoryContextValue {
  entries: MemoryEntry[];
  save: (value: number) => void;
  add: (value: number) => void;
  subtract: (value: number) => void;
  clear: () => void;
  deleteEntry: (id: string) => void;
  rename: (id: string, label: string) => void;
}

export const MemoryContext = createContext<MemoryContextValue | null>(null);

export function useMemoryBank(): MemoryContextValue {
  const context = useContext(MemoryContext);
  if (!context) throw new Error('useMemoryBank must be used within a MemoryProvider');
  return context;
}
