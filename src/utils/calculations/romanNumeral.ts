const ROMAN_VALUES: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
];

export function toRoman(num: number): string {
  if (!Number.isInteger(num) || num < 1 || num > 3999) return '';

  let remaining = num;
  let result = '';
  for (const [symbol, value] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export function fromRoman(roman: string): number {
  const input = roman.trim().toUpperCase();
  if (!/^[MDCLXVI]+$/.test(input)) return 0;

  let total = 0;
  let index = 0;
  for (const [symbol, value] of ROMAN_VALUES) {
    while (input.slice(index, index + symbol.length) === symbol) {
      total += value;
      index += symbol.length;
    }
  }

  if (index !== input.length) return 0;
  // Reject non-canonical forms (e.g. "IIII") by requiring a round trip.
  return toRoman(total) === input ? total : 0;
}
