const FALLBACK_TIME_ZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Moscow',
  'Africa/Cairo',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Pacific/Auckland',
];

export function getSupportedTimeZones(): string[] {
  const intlWithSupportedValues = Intl as typeof Intl & {
    supportedValuesOf?: (key: string) => string[];
  };

  try {
    const values = intlWithSupportedValues.supportedValuesOf?.('timeZone');
    if (values && values.length > 0) {
      return values.includes('UTC') ? values : ['UTC', ...values];
    }
  } catch {
    // Fall through to the static list below.
  }
  return FALLBACK_TIME_ZONES;
}

export function formatInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    dateStyle: 'medium',
    timeStyle: 'long',
  }).format(date);
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);

  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const asUtc = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second'),
  );

  return (asUtc - date.getTime()) / 60000;
}

/**
 * Converts a "wall clock" date/time string (e.g. from a datetime-local input),
 * interpreted as local time in `fromZone`, into the same instant formatted in
 * `toZone`. Uses a single-pass offset lookup rather than a full tz database,
 * so results right at a DST transition boundary may be off by an hour.
 */
export function convertBetweenTimeZones(
  dateTimeLocal: string,
  fromZone: string,
  toZone: string,
): string {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateTimeLocal)) return '';

  const naiveUtc = new Date(`${dateTimeLocal}:00Z`);
  if (Number.isNaN(naiveUtc.getTime())) return '';

  const offsetMinutes = getTimeZoneOffsetMinutes(naiveUtc, fromZone);
  const actualInstant = new Date(naiveUtc.getTime() - offsetMinutes * 60000);
  return formatInTimeZone(actualInstant, toZone);
}
