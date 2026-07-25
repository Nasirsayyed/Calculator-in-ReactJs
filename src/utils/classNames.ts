export type ClassValue = string | number | false | null | undefined;

/** Minimal `classnames`-style joiner - avoids pulling in a dependency for this alone. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
