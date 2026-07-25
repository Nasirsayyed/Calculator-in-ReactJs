const MAX_SAFE_DISPLAY = 1e21;
const MIN_SAFE_DISPLAY = 1e-9;

/**
 * Formats a raw numeric result for display: rounds away floating-point noise,
 * switches to scientific notation for very large/small magnitudes, and trims
 * trailing zeros produced by fixed-precision rounding.
 */
export function formatNumber(value: number, precision = 10): string {
  if (Number.isNaN(value)) return 'NaN';
  if (!Number.isFinite(value)) return value > 0 ? 'Infinity' : '-Infinity';
  if (value === 0) return '0';

  const magnitude = Math.abs(value);

  if (magnitude >= MAX_SAFE_DISPLAY || magnitude < MIN_SAFE_DISPLAY) {
    return value.toExponential(Math.min(precision, 10)).replace(/\.?0+e/, 'e');
  }

  const rounded = Number(value.toPrecision(15));
  const fixed = rounded.toFixed(Math.min(precision, 15));
  const trimmed = fixed.includes('.') ? fixed.replace(/0+$/, '').replace(/\.$/, '') : fixed;

  return trimmed === '-0' ? '0' : trimmed;
}
