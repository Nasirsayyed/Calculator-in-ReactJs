import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { useSettings } from './SettingsContext';
import { readFromStorage, writeToStorage } from '@services/storage';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { historyReducer } from '@store/historyReducer';
import { HistoryContext, type HistoryContextValue } from './HistoryContext';
import type { HistoryEntry } from '@app-types/history';

function loadInitialHistory(): HistoryEntry[] {
  return readFromStorage<HistoryEntry[]>(STORAGE_KEYS.history, []);
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const [entries, dispatch] = useReducer(historyReducer, undefined, loadInitialHistory);

  useEffect(() => {
    writeToStorage(STORAGE_KEYS.history, entries);
  }, [entries]);

  const addEntry = useCallback(
    (expression: string, result: string, mode: string) =>
      dispatch({ type: 'ADD_ENTRY', expression, result, mode, limit: settings.historyLimit }),
    [settings.historyLimit],
  );
  const deleteEntry = useCallback((id: string) => dispatch({ type: 'DELETE_ENTRY', id }), []);
  const clearAll = useCallback(() => dispatch({ type: 'CLEAR_ALL' }), []);
  const togglePin = useCallback((id: string) => dispatch({ type: 'TOGGLE_PIN', id }), []);
  const toggleFavorite = useCallback((id: string) => dispatch({ type: 'TOGGLE_FAVORITE', id }), []);

  const value = useMemo<HistoryContextValue>(
    () => ({ entries, addEntry, deleteEntry, clearAll, togglePin, toggleFavorite }),
    [entries, addEntry, deleteEntry, clearAll, togglePin, toggleFavorite],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
