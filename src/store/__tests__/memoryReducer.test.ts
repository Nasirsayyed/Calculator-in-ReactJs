import { describe, expect, it } from 'vitest';
import { memoryReducer } from '../memoryReducer';
import type { MemoryEntry } from '@app-types/memory';

describe('memoryReducer', () => {
  it('MS saves a new entry at the front', () => {
    const state = memoryReducer([], { type: 'MEMORY_SAVE', value: 42 });
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({ label: 'M1', value: 42 });
  });

  it('M+ creates an entry when memory is empty, then adds to the most recent one', () => {
    let state: MemoryEntry[] = [];
    state = memoryReducer(state, { type: 'MEMORY_ADD', value: 5 });
    expect(state[0]!.value).toBe(5);

    state = memoryReducer(state, { type: 'MEMORY_ADD', value: 3 });
    expect(state[0]!.value).toBe(8);
    expect(state).toHaveLength(1);
  });

  it('M- subtracts from the most recent entry', () => {
    let state = memoryReducer([], { type: 'MEMORY_SAVE', value: 10 });
    state = memoryReducer(state, { type: 'MEMORY_SUBTRACT', value: 4 });
    expect(state[0]!.value).toBe(6);
  });

  it('MC clears every entry', () => {
    let state = memoryReducer([], { type: 'MEMORY_SAVE', value: 1 });
    state = memoryReducer(state, { type: 'MEMORY_SAVE', value: 2 });
    state = memoryReducer(state, { type: 'MEMORY_CLEAR' });
    expect(state).toHaveLength(0);
  });

  it('deletes a single entry by id', () => {
    let state = memoryReducer([], { type: 'MEMORY_SAVE', value: 7 });
    const id = state[0]!.id;
    state = memoryReducer(state, { type: 'MEMORY_DELETE', id });
    expect(state).toHaveLength(0);
  });

  it('renames an entry', () => {
    let state = memoryReducer([], { type: 'MEMORY_SAVE', value: 7 });
    const id = state[0]!.id;
    state = memoryReducer(state, { type: 'MEMORY_RENAME', id, label: 'Tax rate' });
    expect(state[0]!.label).toBe('Tax rate');
  });

  it('SET_ALL replaces the entire list (e.g. loading from storage)', () => {
    const entries: MemoryEntry[] = [{ id: '1', label: 'M1', value: 5, createdAt: 0 }];
    const state = memoryReducer([], { type: 'SET_ALL', entries });
    expect(state).toBe(entries);
  });

  it('ignores unknown action types', () => {
    const state: MemoryEntry[] = [];
    // @ts-expect-error - intentionally invalid action for the default branch
    expect(memoryReducer(state, { type: 'NOT_A_REAL_ACTION' })).toBe(state);
  });
});
