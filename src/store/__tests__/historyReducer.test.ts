import { describe, expect, it } from 'vitest';
import { historyReducer } from '../historyReducer';
import type { HistoryEntry } from '@app-types/history';

describe('historyReducer', () => {
  it('adds a new entry to the front of the list', () => {
    const state = historyReducer([], {
      type: 'ADD_ENTRY',
      expression: '1+1',
      result: '2',
      mode: 'standard',
      limit: 10,
    });
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      expression: '1+1',
      result: '2',
      pinned: false,
      favorite: false,
    });
  });

  it('trims unpinned entries once the limit is exceeded, keeping pinned ones', () => {
    let state: HistoryEntry[] = [];
    state = historyReducer(state, {
      type: 'ADD_ENTRY',
      expression: 'a',
      result: '1',
      mode: 'standard',
      limit: 2,
    });
    state = historyReducer(state, { type: 'TOGGLE_PIN', id: state[0]!.id });
    state = historyReducer(state, {
      type: 'ADD_ENTRY',
      expression: 'b',
      result: '2',
      mode: 'standard',
      limit: 2,
    });
    state = historyReducer(state, {
      type: 'ADD_ENTRY',
      expression: 'c',
      result: '3',
      mode: 'standard',
      limit: 2,
    });

    expect(state).toHaveLength(2);
    expect(state.some((entry) => entry.expression === 'a' && entry.pinned)).toBe(true);
  });

  it('deletes a single entry by id', () => {
    let state = historyReducer([], {
      type: 'ADD_ENTRY',
      expression: '5*5',
      result: '25',
      mode: 'standard',
      limit: 10,
    });
    const id = state[0]!.id;
    state = historyReducer(state, { type: 'DELETE_ENTRY', id });
    expect(state).toHaveLength(0);
  });

  it('clears all unpinned entries but keeps pinned ones', () => {
    let state = historyReducer([], {
      type: 'ADD_ENTRY',
      expression: 'a',
      result: '1',
      mode: 'standard',
      limit: 10,
    });
    state = historyReducer(state, {
      type: 'ADD_ENTRY',
      expression: 'b',
      result: '2',
      mode: 'standard',
      limit: 10,
    });
    state = historyReducer(state, { type: 'TOGGLE_PIN', id: state[1]!.id }); // pin the older entry ("a")
    state = historyReducer(state, { type: 'CLEAR_ALL' });

    expect(state).toHaveLength(1);
    expect(state[0]!.expression).toBe('a');
  });

  it('toggles favorite independently of pin', () => {
    let state = historyReducer([], {
      type: 'ADD_ENTRY',
      expression: '2^2',
      result: '4',
      mode: 'scientific',
      limit: 10,
    });
    const id = state[0]!.id;
    state = historyReducer(state, { type: 'TOGGLE_FAVORITE', id });
    expect(state[0]!.favorite).toBe(true);
    expect(state[0]!.pinned).toBe(false);
  });

  it('SET_ALL replaces the entire list (e.g. loading from storage)', () => {
    const entries: HistoryEntry[] = [
      {
        id: '1',
        expression: '1+1',
        result: '2',
        mode: 'standard',
        timestamp: 0,
        pinned: false,
        favorite: false,
      },
    ];
    const state = historyReducer([], { type: 'SET_ALL', entries });
    expect(state).toBe(entries);
  });

  it('ignores unknown action types', () => {
    const state: HistoryEntry[] = [];
    // @ts-expect-error - intentionally invalid action for the default branch
    expect(historyReducer(state, { type: 'NOT_A_REAL_ACTION' })).toBe(state);
  });
});
