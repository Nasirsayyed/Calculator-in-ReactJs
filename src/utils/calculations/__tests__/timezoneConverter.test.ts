import { describe, expect, it } from 'vitest';
import {
  convertBetweenTimeZones,
  formatInTimeZone,
  getSupportedTimeZones,
} from '../timezoneConverter';

describe('getSupportedTimeZones', () => {
  it('returns a non-empty list including UTC', () => {
    const zones = getSupportedTimeZones();
    expect(zones.length).toBeGreaterThan(0);
    expect(zones).toContain('UTC');
  });
});

describe('formatInTimeZone', () => {
  it('formats a known instant in UTC', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    expect(formatInTimeZone(date, 'UTC')).toContain('2024');
  });
});

describe('convertBetweenTimeZones', () => {
  it('applies a fixed, non-DST offset (UTC -> Asia/Kolkata is always +5:30)', () => {
    const result = convertBetweenTimeZones('2024-06-01T12:00', 'UTC', 'Asia/Kolkata');
    expect(result).toContain('5:30:00 PM');
  });

  it('is a no-op when converting a zone to itself', () => {
    const result = convertBetweenTimeZones('2024-06-01T12:00', 'UTC', 'UTC');
    expect(result).toContain('12:00:00 PM');
  });

  it('returns an empty string for invalid input', () => {
    expect(convertBetweenTimeZones('not-a-date', 'UTC', 'UTC')).toBe('');
  });
});
