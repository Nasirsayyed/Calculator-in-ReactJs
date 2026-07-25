/**
 * Thin localStorage wrapper: every read/write is guarded, so a full quota,
 * disabled storage (private browsing), or corrupted JSON degrades to
 * in-memory-only behavior instead of crashing the app.
 */
export function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeToStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable or quota exceeded - state still works in-memory.
  }
}
