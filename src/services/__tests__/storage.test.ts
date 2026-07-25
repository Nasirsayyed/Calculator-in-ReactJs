import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFromStorage, writeToStorage } from '../storage';

describe('storage', () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('round-trips a value through localStorage', () => {
    writeToStorage('key', { a: 1 });
    expect(readFromStorage('key', null)).toEqual({ a: 1 });
  });

  it('returns the fallback when nothing is stored', () => {
    expect(readFromStorage('missing', 'fallback')).toBe('fallback');
  });

  it('returns the fallback when the stored JSON is corrupted', () => {
    window.localStorage.setItem('key', '{not valid json');
    expect(readFromStorage('key', 'fallback')).toBe('fallback');
  });

  it('degrades gracefully when localStorage.getItem throws', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readFromStorage('key', 'fallback')).toBe('fallback');
  });

  it('degrades gracefully when localStorage.setItem throws (e.g. quota exceeded)', () => {
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    expect(() => writeToStorage('key', 'value')).not.toThrow();
  });
});
