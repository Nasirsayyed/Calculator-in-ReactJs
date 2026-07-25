import { describe, expect, it } from 'vitest';
import { entriesToCsv, entriesToJson } from '../exportHistory';
import type { HistoryEntry } from '@app-types/history';

const sampleEntries: HistoryEntry[] = [
  {
    id: '1',
    expression: '2+2',
    result: '4',
    mode: 'standard',
    timestamp: 1700000000000,
    pinned: false,
    favorite: true,
  },
  {
    id: '2',
    expression: 'sin(30)',
    result: '0.5',
    mode: 'scientific',
    timestamp: 1700000100000,
    pinned: true,
    favorite: false,
  },
];

describe('entriesToCsv', () => {
  it('produces a header row plus one row per entry', () => {
    const csv = entriesToCsv(sampleEntries);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('Expression,Result,Mode,Timestamp,Pinned,Favorite');
    expect(lines[1]).toContain('2+2,4,standard');
    expect(lines[2]).toContain('sin(30),0.5,scientific');
  });

  it('quotes and escapes values containing commas or quotes', () => {
    const csv = entriesToCsv([{ ...sampleEntries[0]!, expression: '1,000+"2"' }]);
    expect(csv).toContain('"1,000+""2"""');
  });

  it('returns just the header for an empty list', () => {
    expect(entriesToCsv([]).split('\n')).toHaveLength(1);
  });
});

describe('entriesToJson', () => {
  it('round-trips entries through JSON', () => {
    const json = entriesToJson(sampleEntries);
    expect(JSON.parse(json)).toEqual(sampleEntries);
  });

  it('produces an empty array for no entries', () => {
    expect(entriesToJson([])).toBe('[]');
  });
});
