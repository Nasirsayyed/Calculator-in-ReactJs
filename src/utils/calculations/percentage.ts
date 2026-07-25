/** `percent`% of `of` - e.g. percentageOf(15, 800) = 120. */
export function percentageOf(percent: number, of: number): number {
  return (percent / 100) * of;
}

/** What percentage `value` is of `of` - e.g. whatPercent(40, 200) = 20. */
export function whatPercent(value: number, of: number): number {
  return of === 0 ? 0 : (value / of) * 100;
}

/** Percentage change from `from` to `to` (positive = increase, negative = decrease). */
export function percentageChange(from: number, to: number): number {
  return from === 0 ? 0 : ((to - from) / Math.abs(from)) * 100;
}
