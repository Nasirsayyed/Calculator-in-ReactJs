import type { HistoryEntry } from '@app-types/history';

export type HistoryAction =
  | { type: 'ADD_ENTRY'; expression: string; result: string; mode: string; limit: number }
  | { type: 'DELETE_ENTRY'; id: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'TOGGLE_PIN'; id: string }
  | { type: 'TOGGLE_FAVORITE'; id: string }
  | { type: 'SET_ALL'; entries: HistoryEntry[] };

function createId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function historyReducer(state: HistoryEntry[], action: HistoryAction): HistoryEntry[] {
  switch (action.type) {
    case 'ADD_ENTRY': {
      const entry: HistoryEntry = {
        id: createId(),
        expression: action.expression,
        result: action.result,
        mode: action.mode,
        timestamp: Date.now(),
        pinned: false,
        favorite: false,
      };
      const next = [entry, ...state];
      if (next.length <= action.limit) return next;

      // Trim oldest, unpinned entries first when the list exceeds the limit.
      const pinned = next.filter((item) => item.pinned);
      const unpinned = next.filter((item) => !item.pinned);
      const roomForUnpinned = Math.max(action.limit - pinned.length, 0);
      return [...pinned, ...unpinned.slice(0, roomForUnpinned)].sort(
        (a, b) => b.timestamp - a.timestamp,
      );
    }

    case 'DELETE_ENTRY':
      return state.filter((item) => item.id !== action.id);

    case 'CLEAR_ALL':
      return state.filter((item) => item.pinned);

    case 'TOGGLE_PIN':
      return state.map((item) =>
        item.id === action.id ? { ...item, pinned: !item.pinned } : item,
      );

    case 'TOGGLE_FAVORITE':
      return state.map((item) =>
        item.id === action.id ? { ...item, favorite: !item.favorite } : item,
      );

    case 'SET_ALL':
      return action.entries;

    default:
      return state;
  }
}
