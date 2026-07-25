import { createContext, useContext } from 'react';
import type { HistoryEntry } from '@app-types/history';

export interface HistoryContextValue {
  entries: HistoryEntry[];
  addEntry: (expression: string, result: string, mode: string) => void;
  deleteEntry: (id: string) => void;
  clearAll: () => void;
  togglePin: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const HistoryContext = createContext<HistoryContextValue | null>(null);

export function useHistory(): HistoryContextValue {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within a HistoryProvider');
  return context;
}
