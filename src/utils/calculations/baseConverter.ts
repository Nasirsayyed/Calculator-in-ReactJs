export function convertBase(value: string, fromBase: number, toBase: number): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  const parsed = parseInt(trimmed, fromBase);
  if (Number.isNaN(parsed)) return '';

  return parsed.toString(toBase).toUpperCase();
}

export function isValidForBase(value: string, base: number): boolean {
  if (!value) return true;
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, base);
  return [...value.toLowerCase()].every((char) => digits.includes(char));
}
