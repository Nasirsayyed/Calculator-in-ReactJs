import type { MemoryEntry } from '@app-types/memory';

export type MemoryAction =
  | { type: 'MEMORY_SAVE'; value: number }
  | { type: 'MEMORY_ADD'; value: number }
  | { type: 'MEMORY_SUBTRACT'; value: number }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'MEMORY_DELETE'; id: string }
  | { type: 'MEMORY_RENAME'; id: string; label: string }
  | { type: 'SET_ALL'; entries: MemoryEntry[] };

function createId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createEntry(state: MemoryEntry[], value: number): MemoryEntry {
  return { id: createId(), label: `M${state.length + 1}`, value, createdAt: Date.now() };
}

export function memoryReducer(state: MemoryEntry[], action: MemoryAction): MemoryEntry[] {
  switch (action.type) {
    case 'MEMORY_SAVE':
      return [createEntry(state, action.value), ...state];

    case 'MEMORY_ADD': {
      if (state.length === 0) return [createEntry(state, action.value)];
      const [head, ...rest] = state;
      if (!head) return state;
      return [{ ...head, value: head.value + action.value }, ...rest];
    }

    case 'MEMORY_SUBTRACT': {
      if (state.length === 0) return [createEntry(state, -action.value)];
      const [head, ...rest] = state;
      if (!head) return state;
      return [{ ...head, value: head.value - action.value }, ...rest];
    }

    case 'MEMORY_CLEAR':
      return [];

    case 'MEMORY_DELETE':
      return state.filter((item) => item.id !== action.id);

    case 'MEMORY_RENAME':
      return state.map((item) => (item.id === action.id ? { ...item, label: action.label } : item));

    case 'SET_ALL':
      return action.entries;

    default:
      return state;
  }
}
